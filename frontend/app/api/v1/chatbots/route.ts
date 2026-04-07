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
    const result = await services.chatbotService.getAllChatbots();
    return NextResponse.json(ok(result.data, result.message), { status: 200 });
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json(payload.body, { status: payload.status });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = validateSchema<schemas.ChatbotPayload>(
      schemas.chatbotSchema,
      body
    );

    const result = await services.chatbotService.createChatbot(payload);

    return NextResponse.json(ok(result.data, result.message), { status: 201 });
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json(payload.body, { status: payload.status });
  }
}
