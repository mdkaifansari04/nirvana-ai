import Joi from 'joi';
import type { CustomRequest } from '../types';
import type { NextFunction, Response } from 'express';
import { validateSchema } from '../helper/schema-validation';

export const userIdValidation = (req: CustomRequest, res: Response, next: NextFunction) => {
   const schema = Joi.object({
      userId: Joi.string().required(),
   });

   validateSchema({ schema, req, next });
};
