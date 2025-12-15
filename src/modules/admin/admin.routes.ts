import { Router } from "express";
import adminController from "./admin.controller.js";
import { verifyJWT } from "../../middlewares/authMiddleware.js";

const controller = adminController();
const adminRoutes: Router = Router();

adminRoutes.get('/users', verifyJWT, controller.getUsers);

export default adminRoutes;