import { Module } from "@nestjs/common";
import { RsvpService } from "./rsvp.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Rsvp, RsvpSchema } from "src/common/schemas/rsvp.schema";
import { RsvpController } from "./rsvp.controller";
import { EmailService } from "src/common/services/email.service";
import { EventsModule } from "src/events/events.module";

@Module({
  imports: [
    EventsModule,
    MongooseModule.forFeature([{ name: Rsvp.name, schema: RsvpSchema }]),
  ],
  controllers: [RsvpController],
  providers: [RsvpService, EmailService],
  exports: [RsvpService],
})
export class RsvpModule {}
