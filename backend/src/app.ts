import { PORT } from "./config/env";

import { clerkMiddleware, requireAuth } from "@clerk/express";
import express, { type NextFunction, type Request, type Response } from "express";
import morgan from "morgan";
import router from "./api/v1/routes";
import connectDB from "./lib/mongoose";
import errorHandler from "./middleware/error";
import cors from "cors";

connectDB();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://nirvana-ai-sigma.vercel.app"],
    credentials: true,
  })
);

app.use(clerkMiddleware());
// app.use(requireAuth());

app.use(morgan("dev"));
app.use(express.json());
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});
// app.use(requireAuth());
app.use("/api/v1", router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
