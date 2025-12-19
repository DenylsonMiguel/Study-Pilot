import type { Request, Response } from "express";
import { UsersService } from "./users.service.js";
import { Result } from "../../core/result.js";
import { respond } from "../../utils/respond.js";
import type { User } from "../../models/users.js"
import { verifyEmail } from "../../utils/verifyEmail.js";
import { UserRole } from "../auth/auth.roles.js";

class UsersController {
  private service = new UsersService();
  
  getMe = async (req: Request, res: Response) => {
    if (!req.user) return respond<User>(Result.fail("You dont have permission", 403, "FORBBIDEN"), res);
    const result = await this.service.getMe(req.user.name);
    respond<{ name: string, email: string, id: string }>(result, res);
  }
}

export default function usersController() { 
  return new UsersController();
}
