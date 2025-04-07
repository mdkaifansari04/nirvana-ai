import Joi from "joi";
import type { CustomRequest } from "../types";
import type { NextFunction, Response } from "express";
import { validateSchema } from "../helper/schema-validation";

export const chatValidation = (
	req: CustomRequest,
	res: Response,
	next: NextFunction,
) => {
	const schema = Joi.object().keys({
		prompt: Joi.string().required(),
		sessionId: Joi.string().required()
	});
	validateSchema({ schema, req, next });
};

export const sessionValidation = (
	req: CustomRequest,
	res: Response,
	next: NextFunction,
) => {
	const schema = Joi.object().keys({
		userId: Joi.string().required(),
	});
	validateSchema({ schema, req, next });
};
