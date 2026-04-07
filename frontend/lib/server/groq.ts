import Groq from "groq-sdk";
import { ApiError } from "./errors";

let groqClient: Groq | null = null;

export const getGroqClient = (): Groq => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new ApiError("GROQ_API_KEY is not configured.", 500);
  }

  if (!groqClient) {
    groqClient = new Groq({ apiKey });
  }

  return groqClient;
};
