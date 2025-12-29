import express from "express";
import type { Express, Request, Response } from "express";
import pkg from "../package.json" with { type: "json" };
import { rateLimiter } from "./middlewares/rateLimit.js";
import authRoutes from "./modules/auth/auth.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import usersRoutes from "./modules/users/users.routes.js";
import subjectsRoutes from "./modules/subjects/subjects.routes.js";

import errorHandler from "./middlewares/errorHandler.js";
import methodNotAllowed from "./middlewares/methodNotAllowed.js";

import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

const app: Express = express();

if (!process.env.FRONTEND_URL) throw new Error("FRONTEND_URL not set");


app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(rateLimiter);
app.use(express.static("public"))

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/users", usersRoutes);
app.use("/subjects", subjectsRoutes);

app.get('/', async (req: Request, res: Response) => {
  res.json({
    status: "ok",
    name: pkg.name,
    version: pkg.version
  });
});

app.use(methodNotAllowed);
app.use(errorHandler);

export default app;