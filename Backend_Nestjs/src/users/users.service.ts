import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CustomError } from "src/common/helpers/exceptions";
import { UsersDto } from "./dto/users.dto";
import { UsersExceptions } from "src/common/helpers/exceptions/user.exception";
import { Users, UsersDocument } from "src/common/schemas/user.schema";
import { Role } from "src/common/constants/enum.constant";
import { paginationAndGroupingAndExecQuery } from "src/common/aggregation-helper/pagination-grouping.aggregation";
import { Rsvp, RsvpDocument } from "src/common/schemas/rsvp.schema";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
    @InjectModel(Rsvp.name) private rsvpModel: Model<RsvpDocument>
  ) {}

  // Get user by id
  async findOneUser(id: string) {
    const findUser = await this.userModel.findById(id);

    if (!findUser) {
      throw UsersExceptions.UserNotFound();
    }
    if (findUser.isDeleted) {
      throw UsersExceptions.UserDeleted();
    }
    return findUser;
  }

  // Get all users
  async listUser(params: UsersDto) {
    try {
      const limit = params.limit ?? 10;
      const offset = params.offset ?? 0;

      const aggregateQuery = [];

      // Only isDeleted is false filter
      aggregateQuery.push({ $match: { isDeleted: false } });

      // Only user role filter
      aggregateQuery.push({ $match: { role: Role.USER } });

      // Searching
      if (params.search) {
        const searchRegex = new RegExp(params.search, "i");
        aggregateQuery.push({
          $match: {
            $or: [{ name: searchRegex }, { email: searchRegex }],
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
              name: "$name",
              email: "$email",
              isActive: "$isActive",
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
        this.userModel
      );
    } catch (error) {
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }

  // Get user by id
  async userDetail(userId: string) {
    try {
      // Get user
      const user = await this.findOneUser(userId);

      return user;
    } catch (error) {
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }

  // Delete user by id
  async removeUser(userId: string) {
    try {
      const findUser = await this.findOneUser(userId);

      // Mark as deleted perform soft delete
      findUser.set({ isDeleted: true });

      await this.rsvpModel.deleteMany({ userId: findUser._id });
      
      await findUser.save();
      return {};
    } catch (error) {
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }

  // Update user status is active or not
  async updateUserStatus(userId: string) {
    try {
      const findUser = await this.findOneUser(userId);

      // Update user status is active or not
      findUser.set({ isActive: !findUser.isActive });

      await findUser.save();
      return {};
    } catch (error) {
      throw CustomError.UnknownError(error?.message, error?.status);
    }
  }
}
