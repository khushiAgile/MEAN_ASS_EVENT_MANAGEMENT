import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Events, EventsSchema } from "../common/schemas/events.schema";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";
import { Rsvp, RsvpSchema } from "src/common/schemas/rsvp.schema";
import { EmailService } from "src/common/services/email.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Events.name, schema: EventsSchema }]),
    MongooseModule.forFeature([{ name: Rsvp.name, schema: RsvpSchema }]),
  ],
  controllers: [EventsController],
  providers: [EventsService, EmailService],
  exports: [EventsService],
})
export class EventsModule {}
