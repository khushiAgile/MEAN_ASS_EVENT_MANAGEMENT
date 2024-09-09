import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "src/common/constants/enum.constant";
import { TABLE_NAMES } from "src/common/constants/table-name.constant";

export type UsersDocument = Users & Document;

@Schema({ collection: TABLE_NAMES.USER, timestamps: true })
export class Users {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true , select: false})
  password: string;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true, default: false })
  isDeleted: boolean;

  @Prop({ required: true })
  role: Role;

  @Prop({ required: false })
  resetPasswordToken: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
