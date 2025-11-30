import mongoose, { Schema, Document, Model } from "mongoose";

export interface User extends Document {
  name: string,
  age: number,
  serie: number;
  createdAt: Date,
  role: "user" | "admin",
  password: string
}

const userSchema = new Schema<User>({
  name: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  serie: { type: Number },
  createdAt: { type: Date, required: true, default: Date.now() }
});

export const UserModel = mongoose.model<User>("User", userSchema);