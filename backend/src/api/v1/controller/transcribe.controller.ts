import type { NextFunction, Request, Response } from "express";
import ErrorResponse from "../../../helper/errorResponse";
import { groq } from "../../../lib/groq";
import { SPEECH_TO_TEXT_MODEL } from "../../../constants/llms";
import fs from "fs";

export const transcribe = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.file) {
			return next(new ErrorResponse("No audio file uploaded", 400));
		}

		const filePath = req.file.path;

		const transcription = await groq.audio.transcriptions.create({
			file: fs.createReadStream(filePath),
			model: SPEECH_TO_TEXT_MODEL,
			prompt: "Specify context or spelling",
			language: "en",
			temperature: 0.0,
		});

		fs.unlinkSync(filePath);

		res.status(200).json({
			success: true,
			message: "Transcribed successfully",
			data: transcription.text
		});
	} catch (error) {
		console.error(error);
		next(new ErrorResponse(error, 500));
	}
};
