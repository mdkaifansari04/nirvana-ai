import type { NextFunction, Response } from 'express';
import type { CustomRequest } from '../types';
import Joi from 'joi';
import { validateSchema } from '../helper/schema-validation';

export const chatbotValidation = (req: CustomRequest, res: Response, next: NextFunction) => {
   const schema = Joi.object().keys({
      name: Joi.string().required(),
      system_prompt: Joi.string().required(),
      slug: Joi.string().required(),
      image: Joi.string().required(),
   });

   validateSchema({ schema, req, next });
};
