import type { NextFunction, Response } from 'express';
import type { CustomRequest } from '../types';
import Joi from 'joi';
import { validateSchema } from '../helper/schema-validation';

export const queryValidation = (req: CustomRequest, res: Response, next: NextFunction) => {
   const schema = Joi.object().keys({
      query: Joi.string().required(),
   });

   validateSchema({ schema, req, next });
};
