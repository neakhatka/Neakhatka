import mongoose, { Schema, model } from "mongoose";

const userschema: Schema = new Schema(
  {
    profile: { type: String, required: false, default: "" },
    authid: { type: String, required: false, default: "" },
    fullname: { type: String, required: true, default: ""  },
    // lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    contactphone: { type: String, required: false, default: "" },
    gender: { type: String, required: false, default: "" },
    location: { type: String, required: false, default: "" },
    DOB: { type: String, required: false, default: "" },
    nationality: { type: String, required: false, default: "" },
    address: { type: String, required: false, default: "" },
    educationbackground: { type: String, required: false, default: "" },
    favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const seeker_profile = model("seeker_profile", userschema);

export { seeker_profile };
