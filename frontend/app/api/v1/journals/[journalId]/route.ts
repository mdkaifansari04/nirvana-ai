import { NextResponse } from "next/server";

import { toErrorPayload, services, getAuthUserId } from "@/lib/server";
import { ok } from "@/lib/server/response";

export const runtime = "nodejs";

type JournalRouteContext = {
  params: Promise<{
    journalId: string;
  }>;
};

export async function GET(_request: Request, { params }: JournalRouteContext) {
  try {
    const { journalId } = await params;
    const userId = await getAuthUserId();
    const result = await services.journalService.getJournalById(
      userId,
      journalId
    );

    return NextResponse.json(ok(result.data, result.message), { status: 200 });
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json(payload.body, { status: payload.status });
  }
}

export async function PUT(request: Request, { params }: JournalRouteContext) {
  try {
    const { journalId } = await params;
    const body = await request.json();
    const result = await services.journalService.updateJournal(journalId, body);

    return NextResponse.json(ok(result.data, result.message), { status: 201 });
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json(payload.body, { status: payload.status });
  }
}

export async function DELETE(_request: Request, { params }: JournalRouteContext) {
  try {
    const { journalId } = await params;
    const userId = await getAuthUserId();
    const result = await services.journalService.deleteJournalEntry(
      userId,
      journalId
    );

    return NextResponse.json(ok(null, result.message), { status: 200 });
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json(payload.body, { status: payload.status });
  }
}
