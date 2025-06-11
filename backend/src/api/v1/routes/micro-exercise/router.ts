import { Router } from "express";
import { microExerciseController as ME } from "../../controller";
import { generateMicroExerciseValidation, contextValidation, microExerciseValidation } from "../../../../validation/micro-exercise-validation";

const microExerciseRouter = Router({ mergeParams: true });

microExerciseRouter.get("/", ME.getUserMicroExercises);
microExerciseRouter.post("/generate", generateMicroExerciseValidation, ME.generateMicroExercise);
microExerciseRouter.get("/:microExerciseId", ME.getMicroExerciseById);
microExerciseRouter.post("/", microExerciseValidation, ME.saveMicroExerciseWithReport);
microExerciseRouter.post("/feedback", contextValidation, ME.getFeedbackForEachStep);
microExerciseRouter.delete("/:microExerciseId", ME.deleteMicroExercise);
microExerciseRouter.get("/report/:reportId", ME.getReportById);
export default microExerciseRouter;
