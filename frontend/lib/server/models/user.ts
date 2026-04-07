import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const userSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  weight: Number,
  age: Number,
  gender: String,
  symptom: [String],
});

export type UserDocument = InferSchemaType<typeof userSchema>;

export const User =
  (mongoose.models.User as Model<UserDocument>) ||
  mongoose.model<UserDocument>("User", userSchema);
