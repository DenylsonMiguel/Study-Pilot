import mongoose, { Schema, Document } from "mongoose";

export interface Subject extends Document {
  name: string;
  annotations: string[];
  avarages: number[];
}

const subjectSchema = new Schema<Subject>({
  name: { type: String, required: true },
  annotations: { type: [String], required: true, default: [] },
  avarages: { type: [Number], required: true, default: [] }
});

export const SubjectModel = mongoose.model<Subject>("Subject", subjectSchema);