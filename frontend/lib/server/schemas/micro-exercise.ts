import Joi from "joi";

export const microExerciseSchema = Joi.object({
  session_goal: Joi.string().required(),
  quick_check_in: Joi.object({
    mood_rating: Joi.number().min(1).max(10),
    primary_emotion: Joi.string(),
  }),
  exercise_content: Joi.object({
    qna: Joi.array()
      .items(
        Joi.object({
          question: Joi.string().required(),
          answer: Joi.string().required(),
        })
      )
      .length(2)
      .required(),
    mcq: Joi.array()
      .items(
        Joi.object({
          question: Joi.string().required(),
          options: Joi.array().items(Joi.string().required()).required(),
          answers: Joi.array().items(Joi.string().required()).required(),
        })
      )
      .length(5)
      .required(),
  }).required(),
  user_reflection: Joi.object({
    mood_rating_after: Joi.number().min(1).max(10),
    reflection: Joi.string(),
  }),
});

export const generateMicroExerciseSchema = Joi.object({
  sessionGoal: Joi.string().required(),
  primaryEmotion: Joi.string().required(),
  mentalHealthRate: Joi.number().min(1).max(10).required(),
});

export const feedbackContextSchema = Joi.object({
  userContext: Joi.string().required(),
});

export type GenerateMicroExercisePayload = {
  sessionGoal: string;
  primaryEmotion: string;
  mentalHealthRate: number;
};

export type FeedbackContextPayload = {
  userContext: string;
};
