import { Router } from "express";
import { getWellnessCards, getWellness, deleteWellnessCard, generateWellnessCard } from "../../controller/wellness.controller";
import { contextValidation, microExerciseValidation } from "validation/micro-exercise-validation";

const wellnessCardRouter = Router();

wellnessCardRouter.post("/", getWellness);
wellnessCardRouter.get("/", getWellnessCards);
wellnessCardRouter.delete("/:id", deleteWellnessCard);
wellnessCardRouter.post("/generate", contextValidation, generateWellnessCard);

export default wellnessCardRouter;