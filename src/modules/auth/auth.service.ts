import { Result } from "../../core/result.js";
import { sendMail } from "../../core/mail/sendgrid.js";
import * as accountCreated from "../../core/mail/pages/accountCreated.js";
import * as confirmEmail from "../../core/mail/pages/confirmEmail.js";
import * as loginSuccessfull from "../../core/mail/pages/login.js";
import type { User } from "../../models/users.js";
import { UserModel, PendingUserModel } from "../../models/users.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("evirorment variable JWT_SECRET is not defined");

export class AuthService {
  async register(data: { name: string, age: number, password: string, email: string }): Promise<Result<{ email: string }>> {
    const existingUName = await UserModel.findOne({ name: data.name });
    const existingUEmail = await UserModel.findOne({ email: data.email });
    if (existingUName || existingUEmail) return Result.fail("This user already exists", 409, "CONFLICT");
    
    const existingPName = await PendingUserModel.findOne({ name: data.name });
    const existingPEmail = await PendingUserModel.findOne({ email: data.email });
    if (existingPName || existingPEmail) return Result.fail("This user already pending", 409, "CONFLICT");
    
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const token = crypto.randomBytes(5).toString("hex");
      const result = await sendMail({ to: data.email, subject: "Verify your StudyPilot email", text: confirmEmail.text(data.name, token) , html: confirmEmail.page(data.name, token) });
      
      if (!result.success) {
        console.error("Error on sending email: " + result.error);
        return Result.fail("Internal server error", 500, "SERVER_ERROR");
      }
      
      const user = new PendingUserModel({ name: data.name, password: hashedPassword, token, email: data.email, age: data.age });
      await user.save();
      
      return Result.ok({ email: user.email }, 202);
    } catch (err) {
      console.error("Error on create pending user: " + err);
      return Result.fail("Internal server error", 500, "SERVER_ERROR");
    }
  }
  
  async confirm(token: string, password: string): Promise<Result<{ user: { name: string, age: number, email: string, id: string, createdAt: Date } }>> {
    try {
      const pendingUser = await PendingUserModel.findOne({ token });
      if (!pendingUser) return Result.fail("User not found", 404, "NOT_FOUND");
      
      const isMatch = await bcrypt.compare(password, pendingUser.password);
      if (!isMatch) return Result.fail("Wrong password", 401, "UNAUTHORIZED");
      if (token !== pendingUser.token) return Result.fail("Wrong token", 401, "UNAUTHORIZED");
      
      const user = new UserModel({ name: pendingUser.name, age: pendingUser.age,  email: pendingUser.email, password: pendingUser.password });
      await user.save();
      
      if (user) await PendingUserModel.findByIdAndDelete(pendingUser._id);
      
      const showUser = { name: user.name, age: user.age, email: user.email, id: user._id as unknown as string, createdAt: user.createdAt };
      
      const result = await sendMail({ to: user.email, subject: "Your Study Pilot account has been successfully created", text: accountCreated.text(user.name), html: accountCreated.page(user.name) })
      
      if (!result.success) {
        console.error("Error on sending email: " + result.error);
        return Result.fail("Internal server error", 500, "SERVER_ERROR");
      }
      
      return Result.ok({ user: showUser }, 201);
    } catch (err) {
      console.error("Error on create user: " + err);
      return Result.fail("Internal server error", 500, "SERVER_ERROR");
    }
  }
  
  async login(email: string, password: string): Promise<Result<{ token: string }>> {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) return Result.fail("User not found", 404, "NOT_FOUND");
      
      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) return Result.fail("Wrong Password", 401, "UNAUTHORIZED");
      
      const result = await sendMail({ to: email, subject: "You have successfully logged in", text: loginSuccessfull.text(user.name) , html: loginSuccessfull.page(user.name) });
      
      if (!result.success) {
        console.error("Error on sending email: " + result.error);
        return Result.fail("Internal server error", 500, "SERVER_ERROR");
      }
      
      const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET!, { expiresIn: "1h"});
      return Result.ok({ token }, 200);
    } catch (err) {
      console.error("Error on login: " + err);
      return Result.fail("Internal Server Error", 500, "SERVER_ERROR");
    }
  }
}