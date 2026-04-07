import Joi from "joi";

export const userSchema = Joi.object({
  clerkId: Joi.string().required(),
  email: Joi.string().required(),
  name: Joi.string().required(),
  weight: Joi.string().allow("").optional(),
  gender: Joi.string().allow("").optional(),
  symptom: Joi.array().items(Joi.string()).optional(),
  age: Joi.number().optional().allow(),
});

export type UserPayload = {
  clerkId: string;
  email: string;
  name: string;
  weight?: string;
  gender?: string;
  symptom?: string[];
  age?: number;
};
