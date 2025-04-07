import type { NextFunction, Request, Response } from "express";
import ErrorResponse from "../../../helper/errorResponse";
import { groq } from "../../../lib/groq";
import { TEXT_GENERATION_MODEL } from "../../../constants/llms";
import { CHAT_SYSTEM_PROMPT } from "../../../constants/prompt";
import type { CustomRequest } from "../../../types";

export const chat = async (
	req: CustomRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { prompt } = req.value;

		const groqChatCompletion = await groq.chat.completions.create({
			model: TEXT_GENERATION_MODEL,
			messages: [
				{
					role: "system",
					content: CHAT_SYSTEM_PROMPT
				},
				{
					role: "user",
					content: prompt,
				},
			],
		});

		const message = groqChatCompletion.choices[0]?.message.content;

		res.status(200).json({
			success: true,
			message: message,
		});
	} catch (error) {
		console.error(error);
		next(new ErrorResponse(error, 500));
	}
};
