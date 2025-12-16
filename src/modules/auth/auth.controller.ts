import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { Result } from "../../core/result.js";
import { respond } from "../../utils/respond.js";
import type { User } from "../../models/users.js"
import { verifyEmail } from "../../utils/verifyEmail.js";

class AuthController {
  private service = new AuthService();
  
  register = async (req: Request, res: Response) => {
    if (!req.body)
      return respond(Result.fail("Missing body", 400, "BAD_REQUEST"), res);
  
    const { name, age, email, password } = req.body;
  
    if (typeof name !== "string" || name.length < 3 || name.length > 15)
      return respond(Result.fail("Invalid or Missing name", 400, "BAD_REQUEST"), res);
  
    if (typeof age !== "number" || age < 1 || age > 100)
      return respond(Result.fail("Invalid or Missing age", 400, "BAD_REQUEST"), res);
  
    if (typeof password !== "string" || password.length < 6 || password.length > 15)
      return respond(Result.fail("Invalid or Missing password", 400, "BAD_REQUEST"), res);
  
    if (typeof email !== "string" || !verifyEmail(email))
      return respond(Result.fail("Invalid or Missing email", 400, "BAD_REQUEST"), res);
  
    const result = await this.service.register({ name, age, email, password });
    return respond(result, res);
  };
  
  confirm = async (req: Request, res: Response) => {
    if (!req.body)
      return respond(Result.fail("Missing body", 400, "BAD_REQUEST"), res);
  
    const { token, password } = req.body;
  
    if (typeof token !== "string")
      return respond(Result.fail("Missing token", 400, "BAD_REQUEST"), res);
  
    if (typeof password !== "string")
      return respond(Result.fail("Missing password", 400, "BAD_REQUEST"), res);
  
    const result = await this.service.confirm(token, password);
    return respond(result, res);
  };
  
  login = async (req: Request, res: Response) => {
    if (!req.body)
      return respond(Result.fail("Missing body", 400, "BAD_REQUEST"), res);
  
    const { email, password } = req.body;
  
    if (typeof email !== "string")
      return respond(Result.fail("Invalid or Missing Email", 400, "BAD_REQUEST"), res);
  
    if (typeof password !== "string")
      return respond(Result.fail("Invalid or Missing Password", 400, "BAD_REQUEST"), res);
  
    const result = await this.service.login(email, password);
    return respond(result, res);
  };
}

export default function authController() { 
  return new AuthController();
}
