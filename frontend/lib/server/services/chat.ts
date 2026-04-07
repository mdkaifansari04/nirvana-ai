import {
  CHAT_SYSTEM_PROMPT,
  TEXT_GENERATION_MODEL,
} from "../constants";
import { connectToDatabase } from "../db";
import { ApiError } from "../errors";
import { getGroqClient } from "../groq";
import { Chat } from "../models/chat";
import { Chatbot } from "../models/chatbot";
import { rethrowOrWrap } from "./_utils";

export const chatWithChatbot = async ({
  userId,
  chatbotId,
  prompt,
  onChunk,
}: {
  userId: string;
  chatbotId: string;
  prompt: string;
  onChunk?: (chunk: string) => void | Promise<void>;
}) => {
  await connectToDatabase();

  try {
    const chatbot = await Chatbot.findById(chatbotId);

    if (!chatbot) {
      throw new ApiError("Chatbot not found !", 404);
    }

    const systemPrompt = `${CHAT_SYSTEM_PROMPT} and you are specialized in ${chatbot.name} and keep this in mind ${chatbot.system_prompt}`;

    const stream = await getGroqClient().chat.completions.create({
      model: TEXT_GENERATION_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: true,
    });

    let aiResponse = "";

    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) {
        aiResponse += content;
        if (onChunk) {
          await onChunk(content);
        }
      }
    }

    const chatSession = await Chat.create({
      userClerkId: userId,
      chatbot: chatbotId,
    });

    chatSession.messages.push(
      {
        sender: "user",
        text: prompt,
        timestamps: new Date(),
      },
      {
        sender: "model",
        text: aiResponse,
        timestamps: new Date(),
      }
    );

    await chatSession.save();

    return {
      message: "Chat streamed successfully",
      data: {
        response: aiResponse,
        chatSession,
      },
    };
  } catch (error) {
    rethrowOrWrap(error, "Internal server error");
  }
};

export const getChatsByChatbotId = async (
  userId: string,
  chatbotId: string
) => {
  await connectToDatabase();

  try {
    const chats = await Chat.find({
      chatbot: chatbotId,
      userClerkId: userId,
    });

    if (!chats) {
      throw new ApiError("Error occured while getting the chats", 500);
    }

    return {
      message: "Chats fetched successfully",
      data: chats,
    };
  } catch (error) {
    rethrowOrWrap(error, "Internal server error");
  }
};
