import { BadRequestException, HttpStatus, Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import * as smtpTransport from "nodemailer-smtp-transport";
import { ConfigService } from "@nestjs/config";
import { CustomError } from "../helpers/exceptions";
import { verifyUserTemplate } from "../constants/mail-template/verify-email.template";
import {  sendRsvpTemplate } from "../constants/mail-template/rsvp-email.template";
import {  sendEventTemplate } from "../constants/mail-template/event-email.template";
import { IEventDetail } from "../interfaces/events.inteface";
interface IMailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}

  public async sendMailLocal(
    mailOptions: Mail.Options
  ): Promise<nodemailer.SentMessageInfo> {
    try {
      const transport = nodemailer.createTransport(
        smtpTransport({
          host: this.configService.get<string>("EMAIL_HOST"),
          port: this.configService.get<string>("EMAIL_PORT"),
          auth: {
            user: this.configService.get<string>("EMAIL_USERNAME"),
            pass: this.configService.get<string>("EMAIL_PASSWORD"),
          },
        })
      );

      return await transport.sendMail(mailOptions);
    } catch (error) {
      return new BadRequestException("Something went wrong!");
    }
  }

  // Common method to handle sending emails
  async sendMail(mailOptions: IMailOptions, cb) {
    const mailOption = {
      from: this.configService.get<string>("EMAIL_FROM"),
      to: mailOptions.to,
      subject: mailOptions.subject,
      html: mailOptions.html,
    };

    this.sendMailLocal(mailOption)
      .then(() => {
        console.log("Email sent successfully local");
        cb(null);
      })
      .catch((error) => {
        console.log("Error while sending email local:", error);
        cb(error);
      });
  }

  // Common method to handle sending emails
  private async sendMailWithTemplate(
    email: string,
    subject: string,
    htmlContent: string
  ) {
    try {
      const mailOptions = {
        to: email,
        subject: subject,
        html: htmlContent,
      };
      await this.sendMail(mailOptions, (error) => {
        if (error) {
          throw CustomError.UnknownError(
            error.message,
            error.statusCode ?? HttpStatus.BAD_REQUEST
          );
        }
      });
    } catch (error) {
      throw CustomError.UnknownError(
        error.message,
        error.statusCode ?? HttpStatus.BAD_REQUEST
      );
    }
  }

  // Send forgot password email
  async forgotPasswordMail(
    email: string,
    subject: string,
    token: string,
    frontUrl: string
  ) {
    const htmlContent = verifyUserTemplate(token, frontUrl);
    await this.sendMailWithTemplate(email, subject, htmlContent);
  }

  // Send RSVP email
  async sendRsvpMail(
    email: string,
    subject: string,
    eventDetails: IEventDetail,
  ) {
    const htmlContent = sendRsvpTemplate(eventDetails);
    await this.sendMailWithTemplate(email, subject, htmlContent);
  }

  // Send event creation email
  async sendEventMail(email: string, subject: string, eventDetails: IEventDetail) {
    const htmlContent = sendEventTemplate(eventDetails); // Changed to use createEventTemplate
    await this.sendMailWithTemplate(email, subject, htmlContent);
  }
}
