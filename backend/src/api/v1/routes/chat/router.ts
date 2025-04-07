import express from "express";
import { chatValidation, sessionValidation } from "../../../../validation/userChat-validation";
import { chatController as CC } from "../../controller";
const router = express.Router();

router.post("/chat", chatValidation, CC.chat);
router.post('/chat/session', sessionValidation, CC.startChatSession)

export default router;
