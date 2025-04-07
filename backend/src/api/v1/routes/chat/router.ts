import express from "express";
import { chatValidation } from "../../../../validation/userChat-validation";
import { chatController as CC } from "../../controller";
const router = express.Router();

router.post("/chat", chatValidation, CC.chat);

export default router;
