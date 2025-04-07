import upload from "../../../../middleware/multer";
import { chatController } from "../../controller";
import express from "express";
const router = express.Router();

router.post("/chat", chatController.chat);

export default router;
