import { PORT } from "./config/env";

import express, { type Request, type Response } from "express";
import errorHandler from "./middleware/error";
import router from "./api/v1/routes";
import morgan from "morgan";
import connectDB from "./lib/mongoose";
import { clerkMiddleware, getAuth, requireAuth } from "@clerk/express";
import { verifyUser } from "./middleware/authorization";

connectDB();

const app = express();
app.use(clerkMiddleware());
app.use(requireAuth());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

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
