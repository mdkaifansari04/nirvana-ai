import { NextResponse } from "next/server";

import { toErrorPayload, services, ApiError } from "@/lib/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { chatbots?: unknown[] };

    if (Array.isArray(body.chatbots) === false) {
      throw new ApiError("Internal server error", 500);
    }

    const result = await services.chatbotService.uploadManyChatbot(body.chatbots);

    return NextResponse.json(
      {
        message: result.message,
        data: result.data,
      },
      { status: 201 }
    );
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json(payload.body, { status: payload.status });
  }
}
