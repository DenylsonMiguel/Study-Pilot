import { Router } from "express";
import authController from "./auth.controller.js";
import methodNotAllowed from "../../middlewares/methodNotAllowed.js";

const controller = authController();
const authRoutes: Router = Router();

authRoutes.post('/register', controller.register);
authRoutes.post('/confirm', controller.confirm);
authRoutes.post('/login', controller.login);

authRoutes.use(methodNotAllowed);

export default authRoutes;