import { HttpException, HttpStatus } from "@nestjs/common";

export const RsvpExceptions = {
  RsvpNotFound(): HttpException {
    return new HttpException(
      {
        message: "Rsvp not found",
        error: "RsvpNotFound",
        statusCode: HttpStatus.FOUND,
      },
      HttpStatus.FOUND
    );
  },

  RsvpAlreadyExist(): HttpException {
    return new HttpException(
      {
        message: "Rsvp already exist",
        error: "RsvpAlreadyExist",
        statusCode: HttpStatus.FOUND,
      },
      HttpStatus.FOUND
    );
  },
};
