import { Result } from "../../core/result.js";
import type { User } from "../../models/users.js";
import { UserModel } from "../../models/users.js";


export class AdminService {
  async getUsers(): Promise<Result<{users: User[]}>> {
    try {
      const users = await UserModel.find();
      if (!users) return Result.fail("Users not found", 404, "NOT_FOUND");
      return Result.ok({ users }, 200);
    } catch (err) {
      console.error("Error on create pending user: " + err);
      return Result.fail("Internal server error", 500, "SERVER_ERROR");
    }
  }
}