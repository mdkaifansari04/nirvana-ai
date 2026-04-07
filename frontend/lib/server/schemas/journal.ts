import Joi from "joi";

export const journalSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

export type JournalPayload = {
  title: string;
  content: string;
};
