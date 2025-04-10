import { Schema, model } from 'mongoose';

const chatbotSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      system_prompt: {
         type: String,
         reqquired: true,
      },
      slug: {
         type: String,
         required: true,
      },
      image: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

export const Chatbot = model('chatbot-message', chatbotSchema);
