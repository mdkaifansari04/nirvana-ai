import {
  OBJECT_GENERATION_MODEL,
  WELLNESS_CARD_GENERATION_SCHEMA,
  WELLNESS_CARD_PROMPT,
} from "../constants";
import { connectToDatabase } from "../db";
import { getGroqClient } from "../groq";
import { Report } from "../models/report";
import {
  WellnessCard,
  type WellnessCardDocument,
} from "../models/wellness-card";
import { parseModelJson, rethrowOrWrap } from "./_utils";

export const createWellnessCard = async (
  userId: string,
  payload: Pick<WellnessCardDocument, "category" | "quote" | "action" | "emoji">
) => {
  await connectToDatabase();

  try {
    const wellnessCard = await WellnessCard.create({
      userClerkId: userId,
      category: payload.category,
      quote: payload.quote,
      action: payload.action,
      emoji: payload.emoji,
    });

    return { data: wellnessCard };
  } catch (error) {
    rethrowOrWrap(error, `Failed to create wellness card : ${String(error)}`);
  }
};

export const getWellnessCards = async (userId: string) => {
  await connectToDatabase();

  try {
    const wellnessCards = await WellnessCard.find({ userClerkId: userId });
    return { data: wellnessCards };
  } catch (error) {
    rethrowOrWrap(error, "Failed to get wellness cards");
  }
};

export const deleteWellnessCard = async (id: string) => {
  await connectToDatabase();

  try {
    await WellnessCard.findByIdAndDelete(id);
    return { data: "Wellness card deleted" };
  } catch (error) {
    rethrowOrWrap(error, `Failed to delete wellness card : ${String(error)}`);
  }
};

export const generateWellnessCard = async (userId: string) => {
  await connectToDatabase();

  try {
    const systemPrompt = WELLNESS_CARD_PROMPT + WELLNESS_CARD_GENERATION_SCHEMA;

    const reports = await Report.find({ userClerkId: userId })
      .sort({ createdAt: -1 })
      .limit(2);

    const chatCompletion = await getGroqClient().chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: reports.map((report: unknown) => report).join("\n"),
        },
      ],
      model: OBJECT_GENERATION_MODEL,
      temperature: 0.4,
      stream: false,
      response_format: { type: "json_object" },
    });

    const parsedResponse = parseModelJson<{ wellnessCard: unknown }>(
      chatCompletion.choices?.[0]?.message?.content
    );

    return { data: parsedResponse.wellnessCard };
  } catch (error) {
    rethrowOrWrap(error, `Failed to generate wellness card : ${String(error)}`);
  }
};
