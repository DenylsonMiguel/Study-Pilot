import express from "express";
import type { Express, Request, Response } from "express";
import pkg from "../package.json" with { type: "json" };
import authRoutes from "./modules/auth/auth.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
// import usersRoutes from "./modules/users/users.routes.js";
// import subjectsRoutes from "./modules/subjects/subjects.routes.js";

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
app.use(rateLimit({
  windowMs: 60 * 1000,
  limit: 100,
}));
app.use(express.static("public"))

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
// app.use("/users", usersRoutes);
// app.use("/subjects", subjectsRoutes);

app.get('/', async (req: Request, res: Response) => {
  res.json({
    status: "ok",
    name: pkg.name,
    version: pkg.version
  });
});

export default app;