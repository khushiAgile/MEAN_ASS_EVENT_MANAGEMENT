import { HttpException, HttpStatus } from "@nestjs/common";

export const UsersExceptions = {
  UserNotFound(): HttpException {
    return new HttpException(
      {
        message: "User not found",
        error: "UserNotFound",
        statusCode: HttpStatus.FOUND,
      },
      HttpStatus.FOUND
    );
  },
  UserDeleted(): HttpException {
    return new HttpException(
      {
        message: "User is deleted",
        error: "UserDeleted",
        statusCode: HttpStatus.FOUND,
      },
      HttpStatus.FOUND
    );
  },
  UserNotActive(): HttpException {
    return new HttpException(
      {
        message: "User is not active",
        error: "UserNotActive",
        statusCode: HttpStatus.FOUND,
      },
      HttpStatus.FOUND
    );
  },
};
