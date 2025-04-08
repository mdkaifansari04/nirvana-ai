import { OBJECT_GENERATION_MODEL } from "../../../constants/llms";
import { MICRO_EXERCISE_SYSTEM_PROMPT } from "../../../constants/prompt";
import {
	MICRO_EXERCISE_GENERATION_SCHEMA,
	SESSION_GOALS,
} from "../../../constants/micro-exercises";
import { groq } from "../../../lib/groq";
import type { CustomRequest } from "../../../types";
import type { Response, NextFunction } from "express";

export const generateMicroExercise = async (
	req: CustomRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const session_goal =
			SESSION_GOALS[Math.floor(Math.random() * SESSION_GOALS.length)];

		const systemPrompt =
			MICRO_EXERCISE_SYSTEM_PROMPT + MICRO_EXERCISE_GENERATION_SCHEMA;

		const chat_completion = await groq.chat.completions.create({
			messages: [
				{
					role: "system",
					content: systemPrompt,
				},
				{
					role: "user",
					content: `Create a CBT micro-exercise on: ${session_goal}`,
				},
			],
			model: OBJECT_GENERATION_MODEL,
			temperature: 0.4,
			stream: false,
			response_format: { type: "json_object" },
		});

		const microExercise = JSON.parse(
			chat_completion.choices?.[0]?.message?.content ?? "{}",
		);
		res.status(200).json({ success: true, data: microExercise });
	} catch (error) {
		console.error(error);
		next(error);
	}
};
