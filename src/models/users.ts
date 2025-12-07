import mongoose, { Schema, Document } from "mongoose";
import type { Subject } from "./subjects.js";

// --- User --- //

export interface User extends Document {
  name: string;
  age: number;
  createdAt: Date;
  role: "user" | "admin";
  password: string;
  email: string;
  subjects: string[];
}

const userSchema = new Schema<User>({
  name: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subjects: { type: [String], required: true, default: [] }
});

export const UserModel = mongoose.model<User>("User", userSchema);

// --- PendingUser --- //

export interface PendingUser extends Document {
  name: string;
  age: number;
  createdAt: Date;
  password: string;
  email: string;
  token: string;
}

const pendingUserSchema = new Schema<PendingUser>({
  name: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  token: { type: String, unique: true, required: true }
});

pendingUserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1900 });

export const PendingUserModel = mongoose.model<PendingUser>("PendingUser", pendingUserSchema);