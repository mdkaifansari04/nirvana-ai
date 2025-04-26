import Joi from "joi";
import type { CustomRequest } from "../types";
import type { NextFunction, Response } from "express";
import { validateSchema } from "../helper/schema-validation";

export const userValidation = (req: CustomRequest, _res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    clerkId: Joi.string().required(),
    email: Joi.string().required(),
    name: Joi.string().required(),
    weight: Joi.string().allow("").optional(),
    gender: Joi.string().allow("").optional(),
    symptom: Joi.array().items(Joi.string()).optional(),
    age: Joi.number().optional().allow(),
  });

  validateSchema({ schema, req, next });
};
