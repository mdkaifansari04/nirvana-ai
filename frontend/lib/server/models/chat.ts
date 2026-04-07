import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const chatSchema = new Schema(
  {
    userClerkId: {
      type: String,
      required: true,
    },
    chatbot: {
      type: Schema.Types.ObjectId,
      ref: "Chatbot",
      required: true,
    },
    messages: [
      {
        sender: {
          type: String,
          enum: ["user", "model"],
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        timestamps: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

export type ChatDocument = InferSchemaType<typeof chatSchema>;

export const Chat =
  (mongoose.models.chat as Model<ChatDocument>) ||
  mongoose.model<ChatDocument>("chat", chatSchema);
