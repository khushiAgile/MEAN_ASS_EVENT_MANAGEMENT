import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import  { Document } from "mongoose";
import { TABLE_NAMES } from "../constants/table-name.constant";

export type EventsDocument = Events & Document;

@Schema({ collection: TABLE_NAMES.EVENT, timestamps: true })
export class Events {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true, default: false })
  isDeleted: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export const EventsSchema = SchemaFactory.createForClass(Events);
