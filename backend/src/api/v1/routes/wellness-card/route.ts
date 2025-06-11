import { Router } from "express";
import { getWellnessCards, getWellness, deleteWellnessCard, generateWellnessCard } from "../../controller/wellness.controller";

const wellnessCardRouter = Router();

wellnessCardRouter.post("/", getWellness);
wellnessCardRouter.get("/", getWellnessCards);
wellnessCardRouter.delete("/:id", deleteWellnessCard);
wellnessCardRouter.post("/generate", generateWellnessCard);

export default wellnessCardRouter;