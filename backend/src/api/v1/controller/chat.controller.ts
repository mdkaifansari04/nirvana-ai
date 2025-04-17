import type { NextFunction, Response } from "express";
import { TEXT_GENERATION_MODEL } from "../../../constants/llms";
import { CHAT_SYSTEM_PROMPT } from "../../../constants/prompt";
import ErrorResponse from "../../../helper/errorResponse";
import { groq } from "../../../lib/groq";
import type { CustomRequest } from "../../../types";
import { Chat } from "../models/chat.model";
import { Chatbot } from "../models/chatbot.model";
import { getAuth } from "@clerk/express";

export const chat = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const { prompt } = req.value;
    const { chatbotId } = req.params;

    const chatbot = await Chatbot.findById(chatbotId);
    if (!chatbot) return next(new ErrorResponse("Chatbot not found !", 404));

    const systemPrompt = `${CHAT_SYSTEM_PROMPT} and you are specliazed in ${chatbot?.name} and keep this in mind ${chatbot?.system_prompt}`;
    const stream = await groq.chat.completions.create({
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
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) {
        aiResponse += content;
        res.write(content);
      }
    }

    res.end();
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

    if (!chatSession) {
      console.log("Error occired while saving the chats");
    }
  } catch (error) {
    console.error(error);
    next(new ErrorResponse(error, 500));
  }
};

export const getChatsByChatbotId = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    console.log(userId);

    const chats = await Chat.find({ chatbot: req.params.chatbotId, userClerkId: userId });

    if (!chats) return next(new ErrorResponse("Error occured while getting the chats", 500));
    res.status(200).json({
      success: true,
      message: "Chats fetched successfully",
      data: chats,
    });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse(error, 500));
  }
};
