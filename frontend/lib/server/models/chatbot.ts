import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const chatbotSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    system_prompt: {
      type: String,
      required: true,
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

export type ChatbotDocument = InferSchemaType<typeof chatbotSchema>;

export const Chatbot =
  (mongoose.models.chatbot as Model<ChatbotDocument>) ||
  mongoose.model<ChatbotDocument>("chatbot", chatbotSchema);
