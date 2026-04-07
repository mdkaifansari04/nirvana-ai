import { NextResponse } from "next/server";

import {
  connectToDatabase,
  models,
  toErrorPayload,
  services,
  validateSchema,
  schemas,
  getAuthUserId,
  ApiError,
} from "@/lib/server";
import { ok } from "@/lib/server/response";

export const runtime = "nodejs";

type ChatRouteContext = {
  params: Promise<{
    chatbotId: string;
  }>;
};

export async function GET(_request: Request, { params }: ChatRouteContext) {
  try {
    const { chatbotId } = await params;
    const userId = await getAuthUserId();
    const result = await services.chatService.getChatsByChatbotId(
      userId,
      chatbotId
    );

    return NextResponse.json(ok(result.data, result.message), { status: 200 });
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json(payload.body, { status: payload.status });
  }
}

export async function POST(request: Request, { params }: ChatRouteContext) {
  try {
    const { chatbotId } = await params;
    const userId = await getAuthUserId();
    const body = await request.json();
    const payload = validateSchema<schemas.ChatPayload>(schemas.chatSchema, body);

    await connectToDatabase();
    const chatbot = await models.Chatbot.findById(chatbotId);
    if (chatbot === null) {
      throw new ApiError("Chatbot not found !", 404);
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        void services.chatService
          .chatWithChatbot({
            userId,
            chatbotId,
            prompt: payload.prompt,
            onChunk: async (chunk: string) => {
              controller.enqueue(encoder.encode(chunk));
            },
          })
          .then(() => {
            controller.close();
          })
          .catch((error) => {
            const failure = toErrorPayload(error);
            controller.enqueue(encoder.encode(failure.body.message));
            controller.close();
          });
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json(payload.body, { status: payload.status });
  }
}
