import mongoose from 'mongoose';
import { CHATBOT_SYSTEM_PROMPTS } from '../../../constants/prompt';

const messageSchema = new mongoose.Schema(
   {
      role: {
         type: String,
         enum: ['user', 'assistant', 'system'],
         required: true,
      },
      content: {
         type: String,
         required: true,
      },
      timestamp: {
         type: Date,
         default: Date.now,
      },
   },
   { _id: true }
);

const chatbotSchema = new mongoose.Schema(
   {
      userClerkId: {
         type: String,
         required: true,
         index: true,
      },
      chatbotKey: {
         type: String,
         required: true,
         enum: Object.keys(CHATBOT_SYSTEM_PROMPTS),
         index: true,
      },
      messages: [messageSchema],
   },
   {
      timestamps: true,
   }
);

chatbotSchema.index({ userClerkId: 1, chatbotKey: 1 }, { unique: true });

export const Chatbot = mongoose.model('chatbot-message', chatbotSchema);
