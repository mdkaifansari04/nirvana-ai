import { toApiError } from "./errors";

export interface ApiSuccessBody<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorBody {
  success: false;
  message: string;
}

export interface ApiSuccessResult<T> {
  status: number;
  body: ApiSuccessBody<T>;
}

export interface ApiErrorResult {
  status: number;
  body: ApiErrorBody;
}

export const ok = <T>(data: T, message = "OK"): ApiSuccessBody<T> => ({
  success: true,
  message,
  data,
});

export const created = <T>(data: T, message = "Created"): ApiSuccessResult<T> => ({
  status: 201,
  body: ok(data, message),
});

export const noContent = (): { status: 204; body: null } => ({
  status: 204,
  body: null,
});

export const toErrorPayload = (error: unknown): ApiErrorResult => {
  const normalizedError = toApiError(error);

  return {
    status: normalizedError.statusCode,
    body: {
      success: false,
      message: normalizedError.message || "Internal server error",
    },
  };
};
