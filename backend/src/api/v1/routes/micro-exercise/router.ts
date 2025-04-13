import { Router } from "express";
import { microExerciseController as ME } from "../../controller";
import { microExerciseValidation } from "../../../../validation/micro-exercise-validation";

const microExerciseRouter = Router({ mergeParams: true });

microExerciseRouter.get("/", ME.getMicroExercises);
microExerciseRouter.post("/generate", ME.generateMicroExercise);
microExerciseRouter.get("/:microExerciseId", ME.getMicroExerciseById);
microExerciseRouter.post("/:userId", microExerciseValidation, ME.saveMicroExerciseWithReport);
microExerciseRouter.delete("/:microExerciseId", ME.deleteMicroExercise);

export default microExerciseRouter;
