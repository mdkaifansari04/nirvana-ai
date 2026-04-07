import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const journalSchema = new Schema(
  {
    userClerkId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export type JournalDocument = InferSchemaType<typeof journalSchema>;

export const Journal =
  (mongoose.models.journal as Model<JournalDocument>) ||
  mongoose.model<JournalDocument>("journal", journalSchema);
