import express from 'express';
import transcribeRouter from './transcribe/router';
import chatbotRouter from './chatbot/router';
import microExerciseRouter from './micro-exercise/router';
import journalRouter from './journal/router';

const router = express.Router();

router.use('/transribe', transcribeRouter);
router.use('/chatbots', chatbotRouter);
router.use('/users/:userId/micro-exercises', microExerciseRouter);
router.use('/users/:userId/journals', journalRouter);

export default router;
