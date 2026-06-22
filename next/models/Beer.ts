import mongoose, { Document, Schema } from "mongoose";
import { connectDB } from "../lib/db";
import TransformSchemaOutput from "../lib/TransformSchemaOutput";

await connectDB();

export interface IBeer extends Document {
  name: string;
  type: "lager" | "ipa" | "apa" | "stout" | "porter";
  note?: string;
  rate: number;
  alcohol: number;
  url: string;
  owner: mongoose.Types.ObjectId;
}

const BeerSchema = new Schema<IBeer>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["lager", "ipa", "apa", "stout", "porter"],
    },
    note: {
      type: String,
      required: false,
    },
    alcohol: {
      type: Number,
      required: true,
      min: 1,
    },
    rate: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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

export const Beer =
  (mongoose.models.Beer as mongoose.Model<IBeer>) ??
  mongoose.model<IBeer>("Beer", BeerSchema);
