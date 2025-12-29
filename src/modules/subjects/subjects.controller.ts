import type { Request, Response } from "express";
import { SubjectsService } from "./subjects.service.js";
import { Result } from "../../core/result.js";
import { respond } from "../../utils/respond.js";

class SubjectsController {
  private service = new SubjectsService();
  
  getAll = async (req: Request, res: Response) => {
    if (!req.user) return respond(Result.fail("You dont have permission", 403, "FORBBIDEN"), res);
    const result = await this.service.getAll(req.user.name);
    return respond<{ subjects: { name: string, _id: string, annotations: string[], averages: number[] }[] }>(result, res);
  }
  
  create = async (req: Request, res: Response) => {
    if (!req.body) return respond(Result.fail("Invalid or Missing body", 400, "BAD_REQUEST"), res);
    
    if (!req.user) return respond(Result.fail("You dont have permission", 403, "FORBBIDEN"), res);
    
    const { name } = req.body;
    if (typeof name !== "string") return respond(Result.fail("Missing name", 400, "BAD_REQUEST"), res);
    
    const result = await this.service.create(name, req.user.name);
    
    return respond<{ subject: { name: string } }>(result, res);
  }
}

export default function subjectsController() {
  return new SubjectsController();
}