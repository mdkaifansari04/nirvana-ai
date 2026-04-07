import { NextResponse } from "next/server";

import { toErrorPayload, services, getAuthUserId } from "@/lib/server";
import { ok } from "@/lib/server/response";

export const runtime = "nodejs";

type WellnessCardRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(
  _request: Request,
  { params }: WellnessCardRouteContext
) {
  try {
    const { id } = await params;
    await getAuthUserId();
    const result = await services.wellnessCardService.deleteWellnessCard(id);

    return NextResponse.json(ok(result.data), { status: 200 });
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json(payload.body, { status: payload.status });
  }
}
