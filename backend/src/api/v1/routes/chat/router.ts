import express from "express";
import { chatValidation, sessionValidation } from "../../../../validation/userChat-validation";
import { chatController as CC } from "../../controller";
const chatRouter = express.Router();

chatRouter.post("/", chatValidation, CC.chat);
chatRouter.post('/session', sessionValidation, CC.startChatSession)

export default chatRouter;
