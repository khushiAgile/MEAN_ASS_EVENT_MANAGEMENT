import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { TABLE_NAMES } from "src/common/constants/table-name.constant";

export type RsvpDocument = Rsvp & Document;

@Schema({ collection: TABLE_NAMES.RSVP, timestamps: true })
export class Rsvp {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: TABLE_NAMES.EVENT })
  eventId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: TABLE_NAMES.USER })
  userId: string;

}

export const RsvpSchema = SchemaFactory.createForClass(Rsvp);
