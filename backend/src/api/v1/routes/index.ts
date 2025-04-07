import express from "express";
import transcribeRouter from "./transcribe/router";
import chatRouter from "./chat/router";

const router = express.Router();

router.use("/transribe", transcribeRouter);
router.use("/chat", chatRouter);

export default router;
