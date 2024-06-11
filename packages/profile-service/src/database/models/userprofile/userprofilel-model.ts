import mongoose, { Document, Schema, model } from "mongoose";
import { IUserDocument } from "../../@types/user.interface";

export interface IUser extends Document {
  profilePicture: string;
  authid: string;
  FullName: string;
  email: string;
  contactPhone: number | null;
  gender: string;
  location: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  educationBackground: string;
  favoriteCards: mongoose.Types.ObjectId[];
}

const userschema: Schema = new Schema(
  {
    profilePicture: { type: String, required: false, default: "" },
    authid: { type: String, required: false },
    FullName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    contactPhone: { type: Number, required: false, default: null },
    gender: { type: String, required: false, default: "" },
    location: { type: String, required: false, default: "" },
    dateOfBirth: { type: String, required: false, default: "" },
    nationality: { type: String, required: false, default: "" },
    address: { type: String, required: false, default: "" },
    educationBackground: { type: String, required: false, default: "" },
    favoriteCards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const seeker_profile = model<IUserDocument>("seeker_profile", userschema);

export { seeker_profile };
