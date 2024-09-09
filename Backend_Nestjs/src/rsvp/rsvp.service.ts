import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { CustomError } from "src/common/helpers/exceptions";
import { Rsvp, RsvpDocument } from "src/common/schemas/rsvp.schema";
import { RsvpDto, RsvpListDto } from "./dto/rsvp.dto";
import { RsvpExceptions } from "src/common/helpers/exceptions/rsvp.exception";
import { TABLE_NAMES } from "src/common/constants/table-name.constant";
import { PaginationDto } from "src/common/dto/index.dto";
import { EmailService } from "src/common/services/email.service";
import { EventsService } from "src/events/events.service";
import { paginationAndGroupingAndExecQuery } from "src/common/aggregation-helper/pagination-grouping.aggregation";

@Injectable()
export class RsvpService {
  constructor(
    private emailService: EmailService,
    private eventService: EventsService,
    @InjectModel(Rsvp.name) private rsvpModel: Model<RsvpDocument>
  ) {}

  //  Create rsvp by user
  async createRsvp(params: RsvpDto, req) {
    try {
      const findRsvp = await this.rsvpModel.findOne({
        userId: req?.user?._id,
        eventId: params.eventId,
      });

      // Get event
      const findEvent = await this.eventService.findOneEvent(params.eventId);

      // Check if rsvp already exist
      if (findRsvp) {
        throw RsvpExceptions.RsvpAlreadyExist();
      }

      this.emailService.sendRsvpMail(
        req?.user?.email,
        "RSVP created ",
        findEvent
      );

      await this.rsvpModel.create({
        ...params,
        isAttend: true,
        userId: req?.user?._id,
      });
      return {};
    } catch (error) {
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }

  //   Get all events attended by user
  async listRsvp(params: PaginationDto, req) {
    try {
      const findUserEvents = await this.rsvpModel.find({
        userId: req?.user?._id,
      });

      if (!findUserEvents) {
        throw RsvpExceptions.RsvpNotFound();
      }

      const limit = params.limit ?? 10;
      const offset = params.offset ?? 0;

      const aggregateQuery = [];

      // Join events table
      aggregateQuery.push({
        $match: {
          userId: {
            $in: findUserEvents.map((rsvp) => rsvp.userId),
          },
        },
      });

      aggregateQuery.push({
        $lookup: {
          from: TABLE_NAMES.EVENT,
          localField: "eventId",
          foreignField: "_id",
          as: "events",
        },
      });

      aggregateQuery.push({
        $addFields: {
          events: { $arrayElemAt: ["$events", 0] },
        },
      });

      aggregateQuery.push({
        $group: {
          _id: null,
          count: { $sum: 1 },
          result: {
            $push: {
              _id: "$_id",
              title: "$events.title",
              description: "$events.description",
              date: "$events.date",
              time: "$events.time",
              location: "$events.location",
              status: "$status",
              createdAt: "$createdAt",
              updatedAt: "$updatedAt",
            },
          },
        },
      });

      return paginationAndGroupingAndExecQuery(
        aggregateQuery,
        limit,
        offset,
        this.rsvpModel
      );
    } catch (error) {
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }

  //   Get all users attended by event
  async listRsvpByEvent(params: RsvpListDto) {
    try {
      const limit = params.limit ?? 10;
      const offset = params.offset ?? 0;

      const aggregateQuery = [];

      // Join events table
      aggregateQuery.push({
        $match: {
          eventId: new mongoose.Types.ObjectId(params.eventId),
        },
      });

      // Join user table
      aggregateQuery.push({
        $lookup: {
          from: TABLE_NAMES.USER,
          localField: "userId",
          foreignField: "_id",
          as: "userList",
        },
      });

      // Add fields
      aggregateQuery.push({
        $addFields: {
          userList: { $arrayElemAt: ["$userList", 0] },
        },
      });

      // Group stage
      aggregateQuery.push({
        $group: {
          _id: null,
          count: { $sum: 1 },
          result: {
            $push: {
              _id: "$_id",
              userId: "$userId",
              name: "$userList.name",
              email: "$userList.email",
              status: "$status",
              createdAt: "$createdAt",
              updatedAt: "$updatedAt",
            },
          },
        },
      });

      return paginationAndGroupingAndExecQuery(
        aggregateQuery,
        limit,
        offset,
        this.rsvpModel
      );
    } catch (error) {
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }
}
