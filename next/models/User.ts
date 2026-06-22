import mongoose, { Document, Schema } from "mongoose";
import { connectDB } from "../lib/db";
import TransformSchemaOutput from "../lib/TransformSchemaOutput";

await connectDB();

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  beers: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    beers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Beer",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: TransformSchemaOutput,
    },
    toObject: {
      transform: TransformSchemaOutput,
    },
  },
);

export const User =
  (mongoose.models.User as mongoose.Model<IUser>) ??
  mongoose.model<IUser>("User", UserSchema);
