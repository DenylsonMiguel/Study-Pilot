import type { Request, Response } from "express";
import { AdminService } from "./admin.service.js";
import { Result } from "../../core/result.js";
import { respond } from "../../utils/respond.js";
import type { User } from "../../models/users.js"
import { verifyEmail } from "../../utils/verifyEmail.js";
import { UserRole } from "../auth/auth.roles.js";
import { isAdmin } from "../../utils/admin.js"

class AdminController {
  private service = new AdminService();
  
  getUsers = async (req: Request, res: Response) => {
    if (!isAdmin(req.user)) return respond<{users: User[]}>(Result.fail("You dont have permission", 403, "FORBBIDEN"), res);
    const result = await this.service.getUsers();
    respond<{users: User[]}>(result, res)
  }
}

export default function adminController() { 
  return new AdminController();
}
