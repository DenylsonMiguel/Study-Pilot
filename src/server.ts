import express from "express";
import type { Express, Request, Response } from "express";
import pkg from "../package.json" with { type: "json" };
// import { authRoutes } from "./modules/auth.routes.js";
// import { usersRoutes } from "./modules/users/users.routes.js";
// import { subjectsRoutes } from "./modules/subjects/subjects.routes.js";

import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

const app: Express = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: "*"
}));
app.use(rateLimit({
  windowMs: 60 * 1000,
  limit: 100,
}));

// app.use("auth", authRoutes);
// app.use("users", usersRoutes);
// app.use("subjects", subjectsRoutes);

app.get('/', async (req: Request, res: Response) => {
  res.json({
    status: "ok",
    name: pkg.name,
    version: pkg.version
  });
});

export default app;