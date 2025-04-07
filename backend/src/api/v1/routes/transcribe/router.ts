import upload from "../../../../middleware/multer";
import { transcribeController } from "../../controller";
import express from "express";
const router = express.Router();

router.post(
	"/transcribe",
	upload.single("voice"),
	transcribeController.transcribe,
);

export default router;
