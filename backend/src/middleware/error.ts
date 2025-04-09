import type { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../helper/errorResponse';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
   try {
      let error = { ...err };
      error.message = err.message;

      console.log('Error log from middleware -> ', error);

      // Bad Object Id
      if (err.name === 'CastError') {
         const message = 'Resource not found';
         error = new ErrorResponse(message, 404);
      }
      // Validation
      if (err.name === 'ValidationError') {
         const message = Object.values(error.errors).map((val: any) => val?.message ?? 'Validation Error');
         error = new ErrorResponse(message, 400);
      }
      // Duplicate entries
      if (err.code === 11000) {
         if (err.message.includes('email_1 dup key:')) {
            const message = `User already Exist`;
            error = new ErrorResponse(message, 400);
         } else {
            const message = `Duplicate Field values.`;
            error = new ErrorResponse(message, 400);
         }
      }

      res.status(error.statusCode || 500).json({
         success: false,
         message: error.message || 'Internal server error',
      });
   } catch (error) {
      console.error(`Internal Server Error; ${error}`);
      next(error);
   }
};

export default errorHandler;
