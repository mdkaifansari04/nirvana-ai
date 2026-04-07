import { NextResponse } from "next/server";

import { toErrorPayload, services, validateSchema, schemas } from "@/lib/server";
import { ok } from "@/lib/server/response";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = validateSchema<schemas.GenerateMicroExercisePayload>(
      schemas.generateMicroExerciseSchema,
      body
    );

    const result = await services.microExerciseService.generateMicroExercise(payload);

    return NextResponse.json(ok(result.data), { status: 200 });
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json(payload.body, { status: payload.status });
  }
}
