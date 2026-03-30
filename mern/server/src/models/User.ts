import mongoose, { Document, Schema } from "mongoose";
import TransformSchemaOutput from "../services/TransformSchemaOutput.ts";

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

export const User = mongoose.model<IUser>("User", UserSchema);
