export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly causeValue?: unknown;

  constructor(message: string, statusCode = 500, causeValue?: unknown) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.causeValue = causeValue;
  }
}

export const isApiError = (error: unknown): error is ApiError => error instanceof ApiError;

const toValidationMessage = (errors: unknown): string | null => {
  if (!errors || typeof errors !== "object") {
    return null;
  }

  const values = Object.values(errors as Record<string, { message?: string }>);
  if (values.length === 0) {
    return null;
  }

  const messages = values
    .map((value) => value?.message)
    .filter((value): value is string => typeof value === "string" && value.length > 0);

  return messages.length > 0 ? messages.join(", ") : null;
};

export const toApiError = (error: unknown, fallbackMessage = "Internal server error"): ApiError => {
  if (isApiError(error)) {
    return error;
  }

  if (error && typeof error === "object") {
    const candidate = error as {
      name?: string;
      message?: string;
      code?: number;
      errors?: unknown;
    };

    if (candidate.name === "CastError") {
      return new ApiError("Resource not found", 404, error);
    }

    if (candidate.name === "ValidationError") {
      const message = toValidationMessage(candidate.errors) ?? "Validation Error";
      return new ApiError(message, 400, error);
    }

    if (candidate.code === 11000) {
      if (typeof candidate.message === "string" && candidate.message.includes("email_1 dup key:")) {
        return new ApiError("User already Exist", 400, error);
      }
      return new ApiError("Duplicate Field values.", 400, error);
    }

    if (typeof candidate.message === "string" && candidate.message.length > 0) {
      return new ApiError(candidate.message, 500, error);
    }
  }

  if (typeof error === "string" && error.length > 0) {
    return new ApiError(error, 500, error);
  }

  return new ApiError(fallbackMessage, 500, error);
};
