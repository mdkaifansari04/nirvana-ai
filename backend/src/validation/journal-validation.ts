import Joi from "joi";
import type { CustomRequest } from "../types";
import type { NextFunction, Response } from "express";
import { validateSchema } from "../helper/schema-validation";


export const journalValidation = (
	req: CustomRequest,
	res: Response,
	next: NextFunction
) => {
	const schema = Joi.object().keys({
		title: Joi.string().required().messages({
			"string.empty": "Title is required",
			"any.required": "Title is required",
		}),
		text: Joi.string().required().messages({
			"string.empty": "Text is required",
			"any.required": "Text is required",
		}),
	});

	validateSchema({ schema, req, next });
};
