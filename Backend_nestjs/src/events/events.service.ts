import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CustomError } from "../common/helpers/exceptions";
import { EventsDto, ListEventsDto } from "./dto/events.dto";
import { Events, EventsDocument } from "../common/schemas/events.schema";
import { EventsExceptions } from "src/common/helpers/exceptions/events.exception";
import { Role } from "src/common/constants/enum.constant";
import { Rsvp, RsvpDocument } from "src/common/schemas/rsvp.schema";
import { EmailService } from "src/common/services/email.service";
import { paginationAndGroupingAndExecQuery } from "src/common/aggregation-helper/pagination-grouping.aggregation";

@Injectable()
export class EventsService {
  constructor(
    private emailService: EmailService,
    @InjectModel(Events.name) private eventsModel: Model<EventsDocument>,
    @InjectModel(Rsvp.name) private rsvpModel: Model<RsvpDocument>
  ) {}

  async findOneEvent(id: string) {
    const findEvent = await this.eventsModel.findById(id);

    if (!findEvent) {
      throw EventsExceptions.EventNotFound();
    }
    if (findEvent.isDeleted) {
      throw EventsExceptions.EventDeleted();
    }
    return findEvent;
  }

  async createEvents(params: EventsDto, req) {
    try {
      const createEvents = await this.eventsModel.create(params);

      this.emailService.sendEventMail(
        req?.user?.email,
        "Event created ",
        createEvents
      );

      return createEvents;
    } catch (error) {
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }

  async listEvents(params: ListEventsDto, req) {
    try {
      const limit = params.limit ?? 10;
      const offset = params.offset ?? 0;

      const aggregateQuery = [];

      // Only isDeleted is false filter
      aggregateQuery.push({ $match: { isDeleted: false } });

      // When role is user show only upcoming events by date filter
      if (req?.user?.role === Role.USER) {
        aggregateQuery.push({
          $match: {
            date: {
              $gte: new Date(new Date().setHours(0, 0, 0, 0)), // Matches today's date or greater
            },
          },
        });
      }

      // location filter
      if (params.location) {
        const searchRegex = new RegExp(params.location, "i");
        aggregateQuery.push({
          $match: {
            $or: [{ location: searchRegex }],
          },
        });
      }

      // date filter
      if (params.date) {
        const searchRegex = new Date(params.date);
        aggregateQuery.push({
          $match: {
            $or: [{ date: searchRegex }],
          },
        });
      }

      // Searching
      if (params.search) {
        const searchRegex = new RegExp(params.search, "i");
        aggregateQuery.push({
          $match: {
            $or: [{ title: searchRegex }],
          },
        });
      }

      // Group stage
      aggregateQuery.push({
        $group: {
          _id: null,
          count: { $sum: 1 },
          result: {
            $push: {
              _id: "$_id",
              title: "$title",
              description: "$description",
              location: "$location",
              date: "$date",
              createdAt: "$createdAt",
              updatedAt: "$updatedAt",
            },
          },
        },
      });

      //  Pagination
      return paginationAndGroupingAndExecQuery(
        aggregateQuery,
        limit,
        offset,
        this.eventsModel
      );
    } catch (error) {
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }

  async eventDetail(eventId: string, req) {
    try {
      const findEvent = await this.findOneEvent(eventId);

      const eventDetail = {
        _id: findEvent._id,
        title: findEvent.title,
        description: findEvent.description,
        location: findEvent.location,
        date: findEvent.date,
        time: findEvent.time,
        createdAt: findEvent.createdAt,
        updatedAt: findEvent.updatedAt,
        isRsvp: false,
      };

      const rsvp = await this.rsvpModel.findOne({
        eventId: findEvent._id,
        userId: req.user._id,
      });

      if (rsvp && req.user.role === Role.USER) {
        eventDetail.isRsvp = true;
      }

      return eventDetail;
    } catch (error) {
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }

  async updateEvent(userId: string, updateUserDto) {
    try {
      const findEvent = await this.findOneEvent(userId);

      findEvent.set(updateUserDto);

      return await findEvent.save();
    } catch (error) {
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }

  async removeEvent(eventId: string) {
    try {
      const findEvent = await this.findOneEvent(eventId);

      // Mark as deleted perform soft delete
      findEvent.set({ isDeleted: true });

      // Delete related RSVPs first

      await this.rsvpModel.deleteMany({ eventId: findEvent._id });

      await findEvent.save();
      return {};
    } catch (error) {
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }
}
