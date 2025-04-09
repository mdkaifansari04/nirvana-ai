import express from "express";
import transcribeRouter from "./transcribe/router";
import chatRouter from "./chat/router";
import microExerciseRouter from "./micro-exercise/router";
import journalRouter from "./journal/router";

const router = express.Router();

router.use("/transribe", transcribeRouter);
router.use("/chat", chatRouter);
router.use("/micro-exercises", microExerciseRouter);
router.use("/journals", journalRouter);

export default router;
