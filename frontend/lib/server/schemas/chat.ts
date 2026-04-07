import Joi from "joi";

export const chatSchema = Joi.object({
  prompt: Joi.string().required(),
});

export type ChatPayload = {
  prompt: string;
};
