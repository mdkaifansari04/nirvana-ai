import { Schema, model } from "mongoose";
import type { InferSchemaType } from "mongoose";

const NirwanaReportSchema = new Schema(
  {
    userClerkId: {
      type: String,
      required: true,
    },
    header: {
      student_name: { type: String, required: true },
      session_date: { type: String, required: true },
      session_id: { type: String, required: true },
      session_goal: { type: String, required: true },
    },
    mood_summary: {
      mood_before: { type: Number, required: true },
      mood_after: { type: Number, required: true },
      primary_emotion: { type: String, required: true },
      mood_delta: { type: Number, required: true },
      emotion_shift_summary: { type: String, required: true },
    },
    reflection_analysis: {
      summary: { type: String, required: true },
    },
    exercise_qna: {
      qna_analysis: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
          tags: [{ type: String }],
        },
      ],
      coping_quality: { type: String, required: true },
      recommendation: { type: String, required: true },
    },
    mcq_evaluation: {
      total_mcqs: { type: Number, required: true },
      correct_answers: { type: Number, required: true },
      score_percent: { type: Number, required: true },
      feedback: { type: String, required: true },
      recommendations: [{ type: String }],
    },
    final_reflection: {
      student_reflection: { type: String, required: true },
      ai_summary: { type: String, required: true },
    },
    progress_insights: {
      progress_level: {
        type: String,
        enum: ["Improving", "Stable", "Declining"],
        required: true,
      },
      daily_streak: { type: Number, required: true },
      recommendations: [{ type: String }],
    },
  },
  { timestamps: true }
);

export const Report = model("NirwanaReport", NirwanaReportSchema);

export type Report = InferSchemaType<typeof NirwanaReportSchema>;
