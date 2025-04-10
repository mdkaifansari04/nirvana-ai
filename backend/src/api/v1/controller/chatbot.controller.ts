import type { NextFunction, Response } from 'express';
import type { CustomRequest } from '../../../types';
import ErrorResponse from '../../../helper/errorResponse';
import { CHAT_SYSTEM_PROMPT, CHATBOT_SYSTEM_PROMPTS } from '../../../constants/prompt';
import { TEXT_GENERATION_MODEL } from '../../../constants/llms';
import { groq } from '../../../lib/groq';
import { Chatbot } from '../models/chatbot.model';

export const getMessages = async (req: CustomRequest, res: Response, next: NextFunction) => {
   const { chatbotKey, userId } = req.params;

   try {
      const doc = await Chatbot.findOne({ chatbotKey, userClerkId: userId });

      if (!doc) {
         return next(new ErrorResponse('No chat messages found', 404));
      }

      res.status(200).json({
         success: true,
         data: doc.messages,
      });
   } catch (error) {
      console.error(error);
      return next(new ErrorResponse('Internal server error', 500));
   }
};

export const createMessage = async (req: CustomRequest, res: Response, next: NextFunction) => {
   const { chatbotKey, userId } = req.params;
   const { query } = req.value;

   try {
      if (!chatbotKey || !CHATBOT_SYSTEM_PROMPTS[chatbotKey]) {
         return next(new ErrorResponse('Invalid chatbot key', 400));
      }

      const doc = await Chatbot.findOne({ chatbotKey, userClerkId: userId });

      if (!doc) {
         return next(new ErrorResponse('No chat history found. Please initialize first.', 404));
      }

      doc.messages.push({
         role: 'user',
         content: query,
         timestamp: new Date(),
      });

      const groqCompletion = await groq.chat.completions.create({
         model: TEXT_GENERATION_MODEL,
         messages: doc.messages.map(({ role, content }) => ({ role, content })).concat({ role: 'user', content: query }),
      });

      doc.messages.push({
         role: 'assistant',
         content: groqCompletion.choices[0]?.message.content,
         timestamp: new Date(),
      });

      await doc.save();

      res.status(200).json({
         success: true,
         data: doc.messages,
      });
   } catch (error) {
      console.error(error);
      return next(new ErrorResponse('Internal server error', 500));
   }
};

export const getAllChatbots = async (req: CustomRequest, res: Response, next: NextFunction) => {
   const chatbots = Object.entries(CHATBOT_SYSTEM_PROMPTS).map(([key, value]) => ({
      key,
      name: value.name,
   }));

   res.status(200).json({
      success: true,
      data: chatbots,
   });
};

export const initializeMessageThread = async (req: CustomRequest, res: Response, next: NextFunction) => {
   const { chatbotKey, userId } = req.params;

   try {
      if (!chatbotKey || !CHATBOT_SYSTEM_PROMPTS[chatbotKey]) {
         return next(new ErrorResponse('Invalid chatbot key', 400));
      }

      const systemPrompt = CHATBOT_SYSTEM_PROMPTS[chatbotKey].system_prompt + CHAT_SYSTEM_PROMPT;

      const existing = await Chatbot.findOne({ chatbotKey, userClerkId: userId });

      if (existing) {
         return next(new ErrorResponse('Chat already initialized', 400));
      }

      const newThread = await Chatbot.create({
         chatbotKey,
         userClerkId: userId,
         messages: [
            {
               role: 'system',
               content: systemPrompt,
               timestamp: new Date(),
            },
         ],
      });

      res.status(200).json({
         success: true,
         message: 'Chat initialized successfully',
         data: newThread,
      });
   } catch (error) {
      console.error(error);
      return next(new ErrorResponse('Internal server error', 500));
   }
};

export const deleteAllMessages = async (req: CustomRequest, res: Response, next: NextFunction) => {
   const { chatbotKey, userId } = req.params;

   try {
      const deleted = await Chatbot.findOneAndDelete({ chatbotKey, userClerkId: userId });

      if (!deleted) {
         return next(new ErrorResponse('No chat found to delete', 404));
      }

      res.status(200).json({
         success: true,
         message: 'Chat deleted successfully',
      });
   } catch (error) {
      console.error(error);
      return next(new ErrorResponse('Internal server error', 500));
   }
};

export const deleteMessageById = async (req: CustomRequest, res: Response, next: NextFunction) => {
   const { chatbotKey, userId, messageId } = req.params;

   try {
      const doc = await Chatbot.findOne({ chatbotKey, userClerkId: userId });

      if (!doc) {
         return next(new ErrorResponse('Chat history not found', 404));
      }

      //@ts-ignore
      doc.messages = doc.messages.filter((msg) => msg._id.toString() !== messageId);
      await doc.save();

      res.status(200).json({
         success: true,
         message: 'Message deleted successfully',
         data: doc.messages,
      });
   } catch (error) {
      console.error(error);
      return next(new ErrorResponse('Internal server error', 500));
   }
};
