import Joi from "joi";

export const wellnessCardSchema = Joi.object({
  category: Joi.string().required(),
  quote: Joi.string().required(),
  action: Joi.string().required(),
  emoji: Joi.string().required(),
});

export type WellnessCardPayload = {
  category: string;
  quote: string;
  action: string;
  emoji: string;
};
