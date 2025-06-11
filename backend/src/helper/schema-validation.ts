import type { Schema } from "joi";
import type { CustomRequest } from "../types";
import type { NextFunction } from "express";
import ErrorResponse from "./errorResponse";

export const validateSchema = ({ schema, req, next }: { schema: Schema; req: CustomRequest; next: NextFunction }) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    console.error("Validation error ->", error.details); // 👈 Add this
    return next(new ErrorResponse(error.details.map((detail) => detail.message).join(", "), 400));
  }
  req.value = value;
  next();
};
