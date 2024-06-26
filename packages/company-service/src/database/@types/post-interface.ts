import mongoose from "mongoose";

export interface IpostDocument {
  companyId?: mongoose.Schema.Types.ObjectId;
  companyName?: string;
  workplace?: string;
  position?: string;
  location?: string;
  jobDescription?: string[];
  jobResponsibilities?: string[];
  startDate: string;
  endDate: string;
  salary?: string;
  totalEmployees?: string;
  time: "full-time" | "part-time";
  duration?: string;
  availablePositions?: string;
  gender: string;
  createdAt: Date;
}
