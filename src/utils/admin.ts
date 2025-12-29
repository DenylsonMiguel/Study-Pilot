import type { User } from "../models/users.js";
import { UserRole } from "../modules/auth/auth.roles.js";

export const isAdmin = (user: User): boolean => !(!user || !user.role || (user.role !== UserRole.ADMIN && user.role !== UserRole.SEED_ADMIN));

export const isSeedAdmin = (user: User): boolean => !user || !user.role || user.role !== UserRole.SEED_ADMIN;