import mongoose, { Schema, Document } from "mongoose";

export interface Subject extends Document {
  name: string;
  annotations: string[];
  averages: number[];
  author: string;
}

const subjectSchema = new Schema<Subject>({
  name: { type: String, required: true },
  annotations: { type: [String], required: true, default: [] },
  averages: { type: [Number], required: true, default: [] },
  author: { type: String, required: true },
});

export const SubjectModel = mongoose.model<Subject>("Subject", subjectSchema);