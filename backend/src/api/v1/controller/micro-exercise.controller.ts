import { OBJECT_GENERATION_MODEL } from "../../../constants/llms";
import {
	MICRO_EXERCISE_REPORT_PROMPT,
	MICRO_EXERCISE_SYSTEM_PROMPT,
} from "../../../constants/prompt";
import {
	MICRO_EXERCISE_GENERATION_SCHEMA,
	MICRO_EXERCISE_REPORT_SCHEMA,
	SESSION_GOALS,
} from "../../../constants/micro-exercises";
import { groq } from "../../../lib/groq";
import type { CustomRequest } from "../../../types";
import type { Response, NextFunction } from "express";
import { MicroExercise } from "../models/micro-exercise.model";

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

		const exerciseContent = JSON.parse(
			chat_completion.choices?.[0]?.message?.content ?? "{}",
		);
		res.status(200).json({ success: true, data: exerciseContent });
	} catch (error) {
		console.error(error);
		next(error);
	}
};

export const saveMicroExercise = async (
	req: CustomRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { userId, filledMicroExercise } = req.value;

		const systemPrompt =
			MICRO_EXERCISE_REPORT_PROMPT + MICRO_EXERCISE_REPORT_SCHEMA;

		const chat_completion = await groq.chat.completions.create({
			model: OBJECT_GENERATION_MODEL,
			temperature: 0.4,
			stream: false,
			response_format: { type: "json_object" },
			messages: [
				{ role: "system", content: systemPrompt },
				{
					role: "user",
					content: `Generate report for the following CBT exercise: ${JSON.stringify(
						filledMicroExercise,
					)}`,
				},
			],
		});

		const ai_generated_report = JSON.parse(
			chat_completion.choices[0]?.message.content ?? "{}",
		);

		const completedExercise = await MicroExercise.create({
			userClerkId: userId,
			session_goal: filledMicroExercise.session_goal,
			quick_check_in: filledMicroExercise.quick_check_in,
			exercise_content: filledMicroExercise.exercise_content,
			user_reflection: filledMicroExercise.user_reflection,
			ai_generated_report,
		});

		const microExercise = await completedExercise.save();

		res.status(200).json({ success: true, data: microExercise });
	} catch (error) {
		console.error("Error saving micro exercise:", error);
		next(error);
	}
};
