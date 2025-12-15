import type { Request, Response } from "express";
import { AdminService } from "./admin.service.js";
import { Result } from "../../core/result.js";
import { respond } from "../../utils/respond.js";
import type { User } from "../../models/users.js"
import { verifyEmail } from "../../utils/verifyEmail.js";
import { UserRole } from "../auth/auth.roles.js";

class AdminController {
  private service = new AdminService();
  
  getUsers = async (req: Request, res: Response) => {
    if (!req.user || !req.user.role || (req.user.role !== UserRole.ADMIN && req.user.role !== UserRole.SEED_ADMIN)) return respond<{users: User[]}>(Result.fail("You dont have permission", 401, "UNAUTHORIZED"), res);
    const result = await this.service.getUsers();
    respond<{users: User[]}>(result, res)
  }
}

export default function adminController() { 
  return new AdminController();
}
