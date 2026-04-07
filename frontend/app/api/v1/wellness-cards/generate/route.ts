import { NextResponse } from "next/server";

import { toErrorPayload, services, getAuthUserId } from "@/lib/server";
import { ok } from "@/lib/server/response";

export const runtime = "nodejs";

export async function POST() {
  try {
    const userId = await getAuthUserId();
    const result = await services.wellnessCardService.generateWellnessCard(userId);

    return NextResponse.json(ok(result.data), { status: 200 });
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json(payload.body, { status: payload.status });
  }
}
