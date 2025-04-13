import express from "express";
import transcribeRouter from "./transcribe/router";
import chatbotRouter from "./chatbot/router";
import microExerciseRouter from "./micro-exercise/router";
import journalRouter from "./journal/router";
import userRouter from "./user/router";

const router = express.Router();

router.use("/transribe", transcribeRouter);
router.use("/chatbots", chatbotRouter);
router.use("/users", userRouter);
router.use("/micro-exercises", microExerciseRouter);
router.use("/journals", journalRouter);

export default router;
