import { Router } from "express";
import authController from "./auth.controller.js";
import { authRateLimiter } from "../../middlewares/rateLimit.js";

const controller = authController();
const authRoutes: Router = Router();

authRoutes.post('/register', controller.register);
authRoutes.post('/confirm', authRateLimiter, controller.confirm);
authRoutes.post('/login', authRateLimiter, controller.login);

export default authRoutes;