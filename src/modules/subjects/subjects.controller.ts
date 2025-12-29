import type { Request, Response } from "express";
import { SubjectsService } from "./subjects.service.js";
import { Result } from "../../core/result.js";
import { respond } from "../../utils/respond.js";

class SubjectsController {
  private service = new SubjectsService();
  
  getAll = async (req: Request, res: Response) => {
    if (!req.user) return respond<{ subjects: { name: string, _id: string, annotations: string[], avarages: number[] }[] }>(Result.fail("You dont have permission", 403, "FORBBIDEN"), res);
    const result = await this.service.getAll(req.user.name);
    return respond<{ subjects: { name: string, _id: string, annotations: string[], avarages: number[] }[] }>(result, res);
  }
}

export default function subjectsController() {
  return new SubjectsController();
}