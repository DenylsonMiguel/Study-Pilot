import { Result } from "../../core/result.js";
import { UserModel } from "../../models/users.js";
import { SubjectModel } from "../../models/subjects.js"


export class SubjectsService {
  async getAll(name: string): Promise<Result<{ subjects: { name: string, _id: string, annotations: string[], avarages: number[] }[] }>> {
    const user = await UserModel.findOne({ name });
    if (!user) return Result.fail("User not found", 404, "NOT_FOUND");
    
    const subjectsIds = user.subjects;
    if (!subjectsIds) return Result.fail("Subjects not found", 404, "NOT_FOUND");
    
    const subjects: { name: string, _id: string, annotations: string[], avarages: number[] }[] = [];
    for (const id of subjectsIds) {
      const subject = await SubjectModel
        .findOne({ _id: id })
        .select("name _id annotations avarages")
        .lean();
      if (!subject) continue;
      subjects.push({ ...subject, _id: subject._id.toString() });
    }
    
    return Result.ok({ subjects }, 200);
  }
}