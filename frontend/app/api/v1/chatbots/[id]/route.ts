import { NextResponse } from "next/server";

import { toErrorPayload, services } from "@/lib/server";
import { ok } from "@/lib/server/response";

export const runtime = "nodejs";

type ChatbotRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(request: Request, { params }: ChatbotRouteContext) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = await services.chatbotService.updateChatbot(id, body);

    return NextResponse.json(ok(result.data, result.message), { status: 200 });
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json(payload.body, { status: payload.status });
  }
}

export async function DELETE(_request: Request, { params }: ChatbotRouteContext) {
  try {
    const { id } = await params;
    const result = await services.chatbotService.deleteChatbot(id);

    return NextResponse.json(ok(result.data, result.message), { status: 200 });
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json(payload.body, { status: payload.status });
  }
}
