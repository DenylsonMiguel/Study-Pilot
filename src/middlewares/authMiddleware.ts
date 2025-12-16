import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { Result } from "../core/result.js";
import { respond } from "../utils/respond.js";

import { UserModel } from '../models/users.js';

export async function verifyJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return respond(
      Result.fail('Invalid or missing token', 401, 'UNAUTHORIZED'),
      res
    );
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return respond(
      Result.fail('Invalid Missing token', 401, 'UNAUTHORIZED'),
      res
    );
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    if (!decoded.id) {
      return respond(
        Result.fail('Invalid token payload', 403, 'UNAUTHORIZED'),
        res
      );
    }

    const user = await UserModel.findById(decoded.id).select(
      'name age email role'
    );

    if (!user) {
      return respond(
        Result.fail('User not found', 401, 'UNAUTHORIZED'),
        res
      );
    }

    req.user = {
      id: user._id.toString(),
      name: user.name,
      age: user.age,
      email: user.email,
      role: user.role,
    };

    next();
  } catch {
    return respond(
      Result.fail('Invalid or Expired token', 401, 'UNAUTHORIZED'),
      res
    );
  }
}