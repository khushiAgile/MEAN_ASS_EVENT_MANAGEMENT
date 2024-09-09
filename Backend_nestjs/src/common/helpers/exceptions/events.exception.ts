import { HttpException, HttpStatus } from "@nestjs/common";

export const EventsExceptions = {
  EventNotFound(): HttpException {
    return new HttpException(
      {
        message: "Event not found",
        error: "EventNotFound",
        statusCode: HttpStatus.FOUND,
      },
      HttpStatus.FOUND
    );
  },
  EventDeleted(): HttpException {
    return new HttpException(
      {
        message: "Event is deleted",
        error: "EventDeleted",
        statusCode: HttpStatus.FOUND,
      },
      HttpStatus.FOUND
    );
  },
};
