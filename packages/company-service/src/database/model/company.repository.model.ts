import { Schema, model,
  //  Document,
    // Model
   } from "mongoose";
const companySchema = new Schema(
  {
    companyName: { type: String, required: true },
    logo: { type: String, required: false, default: "" },
    contactPhone: { type: Number, required: false, default: 0 },
    contactEmail: {
      type: String,
      // required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    websiteLink: { type: String, required: false, default: "" },
    location: { type: String, required: false, default: "" },
    contactPerson: { type: String, required: false, default: "" },
    numberOfEmployees: { type: Number, required: false, default: 0 },
    address: { type: String, required: false, default: "" },
    companyDescription: { type: String, required: false, default: "" },
    userId: { type: String, required: false, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CompanyProfile = model("CompanyProfile",companySchema)

export { CompanyProfile };
