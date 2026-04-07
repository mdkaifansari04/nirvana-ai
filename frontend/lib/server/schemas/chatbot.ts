import Joi from "joi";

export const chatbotSchema = Joi.object({
  name: Joi.string().required(),
  system_prompt: Joi.string().required(),
  slug: Joi.string().required(),
  image: Joi.string().required(),
});

export type ChatbotPayload = {
  name: string;
  system_prompt: string;
  slug: string;
  image: string;
};
