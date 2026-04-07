import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const wellnessCardSchema = new Schema({
  userClerkId: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  emoji: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

export type WellnessCardDocument = InferSchemaType<typeof wellnessCardSchema>;

export const WellnessCard =
  (mongoose.models.WellnessCard as Model<WellnessCardDocument>) ||
  mongoose.model<WellnessCardDocument>("WellnessCard", wellnessCardSchema);
