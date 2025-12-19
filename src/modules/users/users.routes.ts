import { Router } from "express";
import adminController from "./users.controller.js";
import { verifyJWT } from "../../middlewares/authMiddleware.js";
import methodNotAllowed from "../../middlewares/methodNotAllowed.js";

const controller = adminController();
const usersRoutes: Router = Router();

usersRoutes.get('/me', verifyJWT, controller.getMe);
usersRoutes.use(methodNotAllowed);

export default usersRoutes;