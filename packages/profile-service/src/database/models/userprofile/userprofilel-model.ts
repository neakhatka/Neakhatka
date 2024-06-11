import mongoose, { Schema, model } from "mongoose";

const userschema: Schema = new Schema({
  profilePicture: { type: String, required: false , default: ""},
  authid:{ type: String, required: false },
  FullName: { type: String, required: true },
  // lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  contactPhone: { type: Number, required: false, default: null },
  gender: { type: String, required: false , default: ""},
  location: { type: String, required: false , default: ""},
  dateOfBirth: { type: Date, required: false , default:null},
  nationality: { type: String, required: false , default: ""},
  address: { type: String, required: false, default: "" },
  educationBackground: { type: String, required: false , default: ""},
  favoriteCards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
}, {
  versionKey: false,
  timestamps: true,
});

const seeker_profile = model("seeker_profile", userschema);

export { seeker_profile };
