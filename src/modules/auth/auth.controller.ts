import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { Result } from "../../core/result.js";
import { respond } from "../../utils/respond.js";
import type { User } from "../../models/models.js"
import { verifyEmail } from "../../utils/verifyEmail.js";

class AuthController {
  private service = new AuthService();
  
  register = async (req: Request, res: Response) => {
    const data = req.body;
    if (!data.name) return respond<User>(Result.fail("Missing name", 400, "BAD_REQUEST"), res);

    if (data.name.length < 3 || data.name.length > 15) return respond<User>(Result.fail("Invalid name", 400, "BAD_REQUEST"), res);
    
    if (!data.age) return respond<User>(Result.fail("Missing age", 400, "BAD_REQUEST"), res);
    
    if (data.age < 1 || data.age > 100) return respond<User>(Result.fail("Invalid age", 400, "BAD_REQUEST"), res);
    
    if (!data.grade) return respond<User>(Result.fail("Missing grade", 400, "BAD_REQUEST"), res);
    
    if (!data.password) respond<User>(Result.fail("Missing password", 400, "BAD_REQUEST"), res);
    
    if (data.password.length < 6 || data.password.length > 15) return respond<User>(Result.fail("Invalid password", 400, "BAD_REQUEST"), res);
    
    if (!data.email) return respond<User>(Result.fail("Missing email", 400, "BAD_REQUEST"), res);
    
    if (!verifyEmail(data.email)) return respond<User>(Result.fail("Invalid email", 400, "BAD_REQUEST"), res);
    
    const result = await this.service.register({ name: data.name, age: data.age, password: data.password, grade: data.grade, email: data.email });
    
    respond<{ email: string }>(result, res);
  }
}

export default function authController() { 
  return new AuthController();
}
