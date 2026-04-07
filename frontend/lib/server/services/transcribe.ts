import fs from "node:fs";
import { SPEECH_TO_TEXT_MODEL } from "../constants";
import { ApiError } from "../errors";
import { getGroqClient } from "../groq";
import { rethrowOrWrap } from "./_utils";

export const transcribeAudioFile = async (filePath: string) => {
  try {
    if (!filePath) {
      throw new ApiError("No audio file uploaded", 400);
    }

    const transcription = await getGroqClient().audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: SPEECH_TO_TEXT_MODEL,
      prompt: "Specify context or spelling",
      language: "en",
      temperature: 0.0,
    });

    fs.unlinkSync(filePath);

    return {
      message: "Transcribed successfully",
      data: transcription.text,
    };
  } catch (error) {
    rethrowOrWrap(error, `Failed to transcribe audio : ${String(error)}`);
  }
};
