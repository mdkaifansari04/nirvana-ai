import express from "express";
import transcribeRouter from "./transcribe/router";
import chatRouter from "./chat/router";

const router = express.Router();

router.use("/", transcribeRouter);
router.use("/", chatRouter);

export default router;
