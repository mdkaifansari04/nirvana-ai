import { NextResponse } from "next/server";

import { toErrorPayload, services, getAuthUserId } from "@/lib/server";
import { ok } from "@/lib/server/response";

export const runtime = "nodejs";

type MicroExerciseRouteContext = {
  params: Promise<{
    microExerciseId: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: MicroExerciseRouteContext
) {
  try {
    const { microExerciseId } = await params;
    const userId = await getAuthUserId();
    const result = await services.microExerciseService.getMicroExerciseById(
      userId,
      microExerciseId
    );

    return NextResponse.json(ok(result.data), { status: 200 });
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json(payload.body, { status: payload.status });
  }
}

export async function DELETE(
  _request: Request,
  { params }: MicroExerciseRouteContext
) {
  try {
    const { microExerciseId } = await params;
    const userId = await getAuthUserId();
    const result = await services.microExerciseService.deleteMicroExercise(
      userId,
      microExerciseId
    );

    return NextResponse.json(ok(null, result.message), { status: 200 });
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json(payload.body, { status: payload.status });
  }
}
