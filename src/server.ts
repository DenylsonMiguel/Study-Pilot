import express from "express";
import type { Express } from "express";
// import { authRoutes } from "./modules/auth.routes.js";
// import { usersRoutes } from "./modules/users/users.routes.js";
// import { subjectsRoutes } from "./modules/subjects/subjects.routes.js";

import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app: Express = express();

app.use(express.json());
app.use(helmet());
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

export default app;