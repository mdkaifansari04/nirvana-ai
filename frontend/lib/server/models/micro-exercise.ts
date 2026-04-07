import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const qnaSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const mcqSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answers: [{ type: String, required: true }],
});

const exerciseContentSchema = new Schema({
  qna: {
    type: [qnaSchema],
    validate: [(val: typeof qnaSchema[]) => val.length === 2, "Exactly 2 QnA items required"],
    required: true,
  },
  mcq: {
    type: [mcqSchema],
    validate: [(val: typeof mcqSchema[]) => val.length === 5, "Exactly 5 MCQ items required"],
    required: true,
  },
});

const microExerciseSchema = new Schema(
  {
    userClerkId: {
      type: String,
      required: true,
    },
    session_goal: { type: String, required: true },
    quick_check_in: {
      mood_rating: { type: Number, min: 1, max: 10 },
      primary_emotion: { type: String },
    },
    exercise_content: { type: exerciseContentSchema, required: true },
    user_reflection: {
      mood_rating_after: { type: Number, min: 1, max: 10 },
      reflection: { type: String },
    },
    ai_generated_report: {
      type: Schema.Types.ObjectId,
      ref: "NirwanaReport",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export type MicroExerciseDocument = InferSchemaType<typeof microExerciseSchema>;

export const MicroExercise =
  (mongoose.models["micro-exercise"] as Model<MicroExerciseDocument>) ||
  mongoose.model<MicroExerciseDocument>("micro-exercise", microExerciseSchema);
