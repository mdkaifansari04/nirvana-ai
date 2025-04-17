import upload from "../../../../middleware/multer";
import { transcribeController } from "../../controller";
import express from "express";
const transcribeRouter = express.Router();

transcribeRouter.post("/", upload.single("voice"), transcribeController.transcribe);

export default transcribeRouter;
