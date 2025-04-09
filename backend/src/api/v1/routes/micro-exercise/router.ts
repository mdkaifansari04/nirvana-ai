import { Router } from "express";
import { microExerciseController as ME } from "../../controller";
import { microExerciseValidation } from "../../../../validation/micro-exercise-validation";

const microExerciseRouter = Router();

microExerciseRouter.post("/", microExerciseValidation, ME.saveMicroExercise);
microExerciseRouter.post("/generate", ME.generateMicroExercise);

export default microExerciseRouter;
