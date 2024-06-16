import mongoose, { Schema, model } from "mongoose";
const postingSchema: Schema = new Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companymodels",
      required: false,
    },
    companyName: { type: String, required: false },
    workplace: { type: String, required: false },
    position:{type :String , required: false},
    location: { type: String, required: false },
    jobDescription: { type: [String], required: false, default: [] },
    jobResponsibilities: { type: [String], required: false, default: [] },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    salary: { type: [Number], required: false, default: [] },
    totalEmployees: { type: Number, required: false, default: 0 },
    time: {
      type: String,
      enum: ["full-time", "part-time"],
      required: true,
    },
    duration: { type: String, required: false, default: "" },
    availablePositions: { type: Number, required: false, default: 0 },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Post = model("Post", postingSchema);

export { Post };
