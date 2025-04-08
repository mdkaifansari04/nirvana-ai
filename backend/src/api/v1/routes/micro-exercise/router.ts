import { Router } from "express";
import { microExerciseController as ME } from "../../controller";

const microExerciseRouter = Router();

microExerciseRouter.post("/generate", ME.generateMicroExercise);

export default microExerciseRouter;
