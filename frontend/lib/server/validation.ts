import type { Schema } from "joi";
import { ApiError } from "./errors";

export const validateSchema = <T>(schema: Schema, payload: unknown): T => {
  const { error, value } = schema.validate(payload, { abortEarly: false });

  if (error) {
    throw new ApiError(
      error.details.map((detail) => detail.message).join(", "),
      400,
      error
    );
  }

  return value as T;
};
