import { Router } from "express";
import adminController from "./admin.controller.js";
import { verifyJWT } from "../../middlewares/authMiddleware.js";
import methodNotAllowed from "../../middlewares/methodNotAllowed.js";


const controller = adminController();
const adminRoutes: Router = Router();

adminRoutes.get('/users', verifyJWT, controller.getUsers);
adminRoutes.use(methodNotAllowed);

export default adminRoutes;