import { NextResponse } from "next/server";

import {
  toErrorPayload,
  services,
  validateSchema,
  schemas,
} from "@/lib/server";
import { ok } from "@/lib/server/response";

export const runtime = "nodejs";

export async function GET() {
  try {
    const result = await services.userService.getAllUsers();
    return NextResponse.json(ok(result.data, result.message), { status: 200 });
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json(payload.body, { status: payload.status });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = validateSchema<schemas.UserPayload>(schemas.userSchema, body);

    const result = await services.userService.createUser(payload as unknown as Parameters<typeof services.userService.createUser>[0]);

    return NextResponse.json(ok(result.data, result.message), { status: 201 });
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json(payload.body, { status: payload.status });
  }
}
