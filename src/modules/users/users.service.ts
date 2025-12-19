import { Result } from "../../core/result.js";
import type { User } from "../../models/users.js";
import { UserModel } from "../../models/users.js";


export class UsersService {
  async getMe(name: string): Promise<Result<{ name: string, email: string, id: string }>> {
    try {
      if (!name) return Result.fail("Missing or Invalid name", 400, "BAD_REQUEST");
      const user = await UserModel.findOne({ name }).select("name email id");
      if (!user) return Result.fail("User not found", 404, "NOT_FOUND");
      return Result.ok({ name: user.name, email: user.email, id: (user._id as unknown as string) }, 200);
    } catch (err) {
      console.error("Error on get me user: " + err);
      return Result.fail("Internal server error", 500, "SERVER_ERROR");
    }
  }
}