import { NextResponse } from "next/server";

import {
  toErrorPayload,
  services,
  validateSchema,
  schemas,
  getAuthUserId,
} from "@/lib/server";
import { ok } from "@/lib/server/response";

export const runtime = "nodejs";

export async function GET() {
  try {
    const userId = await getAuthUserId();
    const result = await services.wellnessCardService.getWellnessCards(userId);

    return NextResponse.json(ok(result.data), { status: 200 });
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json(payload.body, { status: payload.status });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getAuthUserId();
    const body = await request.json();
    const payload = validateSchema<schemas.WellnessCardPayload>(
      schemas.wellnessCardSchema,
      body
    );

    const result = await services.wellnessCardService.createWellnessCard(
      userId,
      payload
    );

    return NextResponse.json(ok(result.data), { status: 200 });
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json(payload.body, { status: payload.status });
  }
}
