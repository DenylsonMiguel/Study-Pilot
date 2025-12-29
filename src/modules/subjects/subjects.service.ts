import { Result } from "../../core/result.js";
import { UserModel } from "../../models/users.js";
import { SubjectModel } from "../../models/subjects.js"
import type { User } from "../../models/users.js";
import { UserRole } from "../auth/auth.roles.js";


export class SubjectsService {
  async getAll(name: string): Promise<Result<{ subjects: { name: string, _id: string, annotations: string[], averages: number[] }[] }>> {
    const user = await UserModel.findOne({ name });
    if (!user) return Result.fail("User not found", 404, "NOT_FOUND");
  
    if (user.subjects.length === 0) return Result.fail("Subjects not found", 404, "NOT_FOUND");
  
    const subjectsDocs = await SubjectModel
      .find({ _id: { $in: user.subjects } })
      .select("name _id annotations averages")
      .lean();
  
    const subjects = subjectsDocs.map(sub => ({
      ...sub,
      _id: sub._id.toString(),
    }));
  
    return Result.ok({ subjects }, 200);
  }
  
  async create(name: string, author: string): Promise<Result<{ subject: { name: string, author: string} }>> {
    try {
      const existingSubject = await SubjectModel.findOne({ name });
      if (existingSubject && existingSubject.author === author)
        return Result.fail("You already have this subject", 409, "CONFLICT");
      
      const user = await UserModel.findOne({ name: author });
      if (!user) return Result.fail("User not found", 404, "NOT_FOUND");
      
      const subject = new SubjectModel({ name, author });
      await subject.save();
      
      (user as unknown as User).subjects.push(subject._id as unknown as string);
      await user.save();
      
      return Result.ok({ subject: { name, author } }, 201);
    } catch (err) {
      console.error("Error on create subject: " + err);
      return Result.fail("Internal server error", 500, "SERVER_ERROR");
    }
  }
}