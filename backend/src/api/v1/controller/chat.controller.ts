import type { NextFunction, Response } from 'express';
import { TEXT_GENERATION_MODEL } from '../../../constants/llms';
import { CHAT_SYSTEM_PROMPT } from '../../../constants/prompt';
import ErrorResponse from '../../../helper/errorResponse';
import { groq } from '../../../lib/groq';
import type { CustomRequest } from '../../../types';
import { Chat } from '../models/chat.model';
import { Chatbot } from '../models/chatbot.model';

export const chat = async (req: CustomRequest, res: Response, next: NextFunction) => {
   try {
      const { prompt } = req.value;
      const { chatbotId } = req.params;

      const chatbot = Chatbot.findById(chatbotId);
      const stream = await groq.chat.completions.create({
         model: TEXT_GENERATION_MODEL,
         messages: [
            {
               role: 'system',
               content: CHAT_SYSTEM_PROMPT,
            },
            {
               role: 'user',
               content: prompt,
            },
         ],
         stream: true,
      });

      let aiResponse = '';
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Transfer-Encoding', 'chunked');

      for await (const chunk of stream) {
         const content = chunk.choices?.[0]?.delta?.content;
         if (content) {
            aiResponse += content;
            res.write(content);
         }
      }

      res.end();
      // const chatSession = await Chat.create({
      //     userClerkId:
      // })
      // chatSession.messages.push(
      //   {
      //     sender: "user",
      //     text: prompt,
      //     timestamps: new Date(),
      //   },
      //   {
      //     sender: "model",
      //     text: aiResponse,
      //     timestamps: new Date(),
      //   }
      // );
      // await chatSession.save();
   } catch (error) {
      console.error(error);
      next(new ErrorResponse(error, 500));
   }
};
