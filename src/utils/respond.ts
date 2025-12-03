import { Result } from "../core/result.js";
import type { Response } from "express";

export function respond<T>(result: Result<T>, res: Response) {
  if (!result.ok && result.error) return res.status(result.status).json({ error: result.error.message, code: result.error.code ?? "" });
  res.status(result.status).json(result.data);
}