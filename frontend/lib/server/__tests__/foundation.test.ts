import { describe, expect, test } from "bun:test";
import Joi from "joi";

import { ApiError, isApiError, toApiError } from "../errors";
import { created, noContent, ok, toErrorPayload } from "../response";
import { extractUserId } from "../auth";
import { validateSchema } from "../validation";

describe("server foundation utils", () => {
  test("ApiError keeps message and status code", () => {
    const error = new ApiError("boom", 418);
    expect(error.message).toBe("boom");
    expect(error.statusCode).toBe(418);
  });

  test("isApiError detects ApiError instances", () => {
    expect(isApiError(new ApiError("x", 400))).toBe(true);
    expect(isApiError(new Error("x"))).toBe(false);
  });

  test("toApiError normalizes unknown values", () => {
    const error = toApiError("bad");
    expect(error).toBeInstanceOf(ApiError);
    expect(error.statusCode).toBe(500);
  });

  test("ok() returns standard success payload", () => {
    const payload = ok({ hello: "world" }, "done");
    expect(payload.success).toBe(true);
    expect(payload.message).toBe("done");
    expect(payload.data.hello).toBe("world");
  });

  test("created() sets 201 status", () => {
    const payload = created({ id: 1 }, "created");
    expect(payload.status).toBe(201);
    expect(payload.body.success).toBe(true);
  });

  test("noContent() sets 204 status", () => {
    const payload = noContent();
    expect(payload.status).toBe(204);
  });

  test("toErrorPayload converts ApiError to payload", () => {
    const payload = toErrorPayload(new ApiError("nope", 404));
    expect(payload.status).toBe(404);
    expect(payload.body.success).toBe(false);
    expect(payload.body.message).toBe("nope");
  });

  test("extractUserId throws for missing user", () => {
    expect(() => extractUserId(null)).toThrow("Unauthorized");
  });

  test("extractUserId returns user id", () => {
    expect(extractUserId("user_1")).toBe("user_1");
  });

  test("validateSchema returns validated value", () => {
    const schema = Joi.object({ name: Joi.string().required() });
    const value = validateSchema<{ name: string }>(schema, { name: "nirvana" });
    expect(value.name).toBe("nirvana");
  });

  test("validateSchema throws 400 on invalid payload", () => {
    const schema = Joi.object({ name: Joi.string().required() });

    try {
      validateSchema(schema, {});
      throw new Error("Expected validateSchema to throw");
    } catch (error) {
      const apiError = toApiError(error);
      expect(apiError.statusCode).toBe(400);
    }
  });
});
