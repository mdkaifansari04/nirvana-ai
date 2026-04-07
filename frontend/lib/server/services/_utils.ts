import { ApiError, isApiError } from "../errors";

export const rethrowOrWrap = (
  error: unknown,
  fallbackMessage: string,
  statusCode = 500
): never => {
  if (isApiError(error)) {
    throw error;
  }

  throw new ApiError(fallbackMessage, statusCode, error);
};

export const parseModelJson = <T>(content: string | null | undefined): T => {
  try {
    return JSON.parse(content ?? "{}") as T;
  } catch (error) {
    throw new ApiError("Failed to parse model response", 500, error);
  }
};
