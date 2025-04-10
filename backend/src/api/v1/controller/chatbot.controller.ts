import type { NextFunction, Response } from 'express';
import type { CustomRequest } from '../../../types';
import { Chatbot } from '../models/chatbot.model';
import ErrorResponse from '../../../helper/errorResponse';
import { getAuth } from '@clerk/express';

// CREATE chatbot
export const createChatbot = async (req: CustomRequest, res: Response, next: NextFunction) => {
   const { name, system_prompt, slug, image } = req.value;

   try {
      const chatbot = await Chatbot.create({ name, system_prompt, slug, image });

      res.status(201).json({
         success: true,
         message: 'Chatbot created successfully',
         data: chatbot,
      });
   } catch (error) {
      console.error(error);
      return next(new ErrorResponse('Internal server error', 500));
   }
};

// READ all chatbots
export const getAllChatbots = async (req: CustomRequest, res: Response, next: NextFunction) => {
   try {
      const chatbots = await Chatbot.find({});
      const { userId } = getAuth(req);
      console.log(userId);

      res.status(200).json({
         success: true,
         message: 'Chatbots fetched successfully',
         data: chatbots,
      });
   } catch (error) {
      console.error(error);
      return next(new ErrorResponse('Internal server error', 500));
   }
};

// READ chatbot by ID
export const getChatbotById = async (req: CustomRequest, res: Response, next: NextFunction) => {
   const { id } = req.value;

   try {
      const chatbot = await Chatbot.findById(id);

      if (!chatbot) return next(new ErrorResponse('Chatbot not found', 404));

      res.status(200).json({
         success: true,
         message: 'Chatbot fetched successfully',
         data: chatbot,
      });
   } catch (error) {
      console.error(error);
      return next(new ErrorResponse('Internal server error', 500));
   }
};

// UPDATE chatbot
export const updateChatbot = async (req: CustomRequest, res: Response, next: NextFunction) => {
   const { id } = req.params;

   try {
      const chatbot = await Chatbot.findByIdAndUpdate({ _id: id }, req.body, { new: true });

      if (!chatbot) return next(new ErrorResponse('Chatbot not found', 404));

      res.status(200).json({
         success: true,
         message: 'Chatbot updated successfully',
         data: chatbot,
      });
   } catch (error) {
      console.error(error);
      return next(new ErrorResponse('Internal server error', 500));
   }
};

// DELETE chatbot
export const deleteChatbot = async (req: CustomRequest, res: Response, next: NextFunction) => {
   const { id } = req.params;

   try {
      const chatbot = await Chatbot.findByIdAndDelete(id);

      if (!chatbot) return next(new ErrorResponse('Chatbot not found', 404));

      res.status(200).json({
         success: true,
         message: 'Chatbot deleted successfully',
         data: chatbot,
      });
   } catch (error) {
      console.error(error);
      return;
   }
};

export const createManyChatbot = async (req: CustomRequest, res: Response, next: NextFunction) => {
   try {
      const { chatbots } = req.body;

      if (!Array.isArray(chatbots) || chatbots.length === 0) {
         return next(new ErrorResponse('Internal server error', 500));
      }

      const createdChatbots = await Chatbot.insertMany(chatbots, { ordered: false });

      res.status(201).json({
         message: 'Chatbots created successfully.',
         data: createdChatbots,
      });
   } catch (error) {
      console.error(error);
      return next(new ErrorResponse('Internal server error', 500));
   }
};
