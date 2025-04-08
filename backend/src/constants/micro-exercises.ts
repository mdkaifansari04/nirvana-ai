export const SESSION_GOALS = [
	"Thought Challenger",
	"Cognitive Distortion Detective",
	"Gratitude Reframe",
	"Values Alignment Check",
	"Self-Compassion Break",
	"Behavioral Activation Mini Plan",
];

export const MICRO_EXERCISE_GENERATION_SCHEMA = JSON.stringify(
	{
		$defs: {
			MCQ: {
				properties: {
					question: { title: "Question", type: "string" },
					options: {
						items: { type: "string" },
						title: "Options",
						type: "array",
						minItems: 2,
						maxItems: 4,
					},
				},
				required: ["question", "options"],
				title: "MultipleChoiceQuestion",
				type: "object",
			},
			QnA: {
				properties: {
					question: { title: "Question", type: "string" },
				},
				required: ["question"],
				title: "OpenEndedQuestion",
				type: "object",
			},
		},
		properties: {
			session_goal: { title: "Session Goal", type: "string" },
			core_exercise: {
				properties: {
					qna: {
						items: { $ref: "#/$defs/QnA" },
						title: "Open Ended Questions",
						type: "array",
						minItems: 2,
						maxItems: 2,
					},
					mcq: {
						items: { $ref: "#/$defs/MCQ" },
						title: "Multiple Choice Questions",
						type: "array",
						minItems: 5,
						maxItems: 5,
					},
				},
				required: ["qna", "mcq"],
				title: "Core Exercise",
				type: "object",
			},
		},
		required: ["session_goal", "core_exercise"],
		title: "CBTSession",
		type: "object",
	},
	null,
	4,
);
