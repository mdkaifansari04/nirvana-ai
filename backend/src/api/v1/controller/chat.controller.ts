import type { NextFunction, Response } from "express";
import { TEXT_GENERATION_MODEL } from "../../../constants/llms";
import {
	CHAT_SYSTEM_PROMPT,
	CHATBOT_SYSTEM_PROMPTS,
} from "../../../constants/prompt";
import ErrorResponse from "../../../helper/errorResponse";
import { groq } from "../../../lib/groq";
import type { CustomRequest } from "../../../types";
import { Query } from "../models/query.model";

export const chat = async (
	req: CustomRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { prompt, sessionId } = req.value;
		const { chatbotName } = req.query as { chatbotName: string };

		if (!chatbotName || !CHATBOT_SYSTEM_PROMPTS[chatbotName]) {
			return next(new ErrorResponse("Invalid or missing chatbot name", 400));
		}

		const chatSession = await Query.findOne({ sessionId });
		if (!chatSession) return next(new ErrorResponse("Session not found", 404));

		const systemPrompt =
			CHATBOT_SYSTEM_PROMPTS[chatbotName].system_prompt + CHAT_SYSTEM_PROMPT;

		const stream = await groq.chat.completions.create({
			model: TEXT_GENERATION_MODEL,
			messages: [
				{
					role: "system",
					content: systemPrompt,
				},
				{
					role: "user",
					content: prompt,
				},
			],
			stream: true,
		});

		let aiResponse = "";
		res.setHeader("Content-Type", "text/plain; charset=utf-8");
		res.setHeader("Transfer-Encoding", "chunked");

		for await (const chunk of stream) {
			const content = chunk.choices?.[0]?.delta?.content;
			if (content) {
				aiResponse += content;
				res.write(content);
			}
		}

		res.end();
		chatSession.messages.push(
			{
				sender: "user",
				text: prompt,
				timestamps: new Date(),
			},
			{
				sender: "model",
				text: aiResponse,
				timestamps: new Date(),
			},
		);
		await chatSession.save();
	} catch (error) {
		console.error(error);
		next(new ErrorResponse(error, 500));
	}
};

export const startChatSession = async (
	req: CustomRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { userId } = req.value;
		const query = await Query.create({
			userClerkId: userId,
			sessionId: new Date().getTime().toString(),
		});

		if (!query)
			return next(
				new ErrorResponse("Error occured while creating the session.", 400),
			);

		res.status(200).json({
			success: true,
			message: "Session started",
			data: query,
		});
	} catch (error) {
		console.error("Error starting session", error);
		return next(new ErrorResponse("Internal server error", 500));
	}
};
