import type { Schema } from 'joi';
import type { CustomRequest } from '../types';
import type { NextFunction } from 'express';
import ErrorResponse from './errorResponse';

export const validateSchema = ({ schema, req, next }: { schema: Schema; req: CustomRequest; next: NextFunction }) => {
   const { error, value } = schema.validate(req.body);

   if (error) return next(new ErrorResponse(`Validation Error : ${error}`, 400));
   req.value = value;
   next();
};
