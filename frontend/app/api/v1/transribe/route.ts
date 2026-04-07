import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";
import { NextResponse } from "next/server";

import { ApiError, toErrorPayload, services } from "@/lib/server";
import { ok } from "@/lib/server/response";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 40 * 1024 * 1024;
const ALLOWED_MIME = "audio/wav";
const ALLOWED_EXTENSIONS = new Set([".wav"]);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const voice = formData.get("voice");

    if (!(voice instanceof File)) {
      throw new ApiError("No audio file uploaded", 400);
    }

    const extension = extname(voice.name).toLowerCase();
    const isValidMimeOrExtension =
      voice.type === ALLOWED_MIME || ALLOWED_EXTENSIONS.has(extension);

    if (!isValidMimeOrExtension) {
      throw new ApiError("Only .wav audio files are allowed", 400);
    }

    if (voice.size > MAX_FILE_SIZE) {
      throw new ApiError("Audio file exceeds 40MB limit", 400);
    }

    const fileBuffer = Buffer.from(await voice.arrayBuffer());
    const safeExtension = ALLOWED_EXTENSIONS.has(extension)
      ? extension
      : ".wav";
    const tempPath = join(
      tmpdir(),
      `voice-${Date.now()}-${randomUUID()}${safeExtension}`
    );

    await writeFile(tempPath, fileBuffer);

    const result = await services.transcribeService.transcribeAudioFile(tempPath);

    return NextResponse.json(ok(result.data, result.message), { status: 200 });
  } catch (error) {
    const payload = toErrorPayload(error);
    return NextResponse.json(payload.body, { status: payload.status });
  }
}
