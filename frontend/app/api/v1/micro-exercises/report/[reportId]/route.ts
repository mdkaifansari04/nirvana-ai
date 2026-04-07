import { NextResponse } from "next/server";

import { toErrorPayload, services, getAuthUserId } from "@/lib/server";
import { ok } from "@/lib/server/response";

export const runtime = "nodejs";

type ReportRouteContext = {
  params: Promise<{
    reportId: string;
  }>;
};

export async function GET(_request: Request, { params }: ReportRouteContext) {
  try {
    const { reportId } = await params;
    const userId = await getAuthUserId();
    const result = await services.microExerciseService.getReportById(
      userId,
      reportId
    );

    return NextResponse.json(ok(result.data, result.message), { status: 200 });
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json(payload.body, { status: payload.status });
  }
}
