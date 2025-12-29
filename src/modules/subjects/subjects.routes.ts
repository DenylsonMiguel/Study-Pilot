import { Router } from "express";
import subjectsController from "./subjects.controller.js";
import { verifyJWT } from "../../middlewares/authMiddleware.js";
import methodNotAllowed from "../../middlewares/methodNotAllowed.js";

const controller = subjectsController();
const subjectsRoutes: Router = Router();

subjectsRoutes.get('', verifyJWT, controller.getAll);
subjectsRoutes.use(methodNotAllowed);

export default subjectsRoutes;