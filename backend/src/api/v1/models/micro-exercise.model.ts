import mongoose from 'mongoose';

const QnASchema = new mongoose.Schema({
   question: { type: String, required: true },
   answer: { type: String, required: true },
});

const MCQSchema = new mongoose.Schema({
   question: { type: String, required: true },
   options: [{ type: String, required: true }],
   answers: [{ type: String, required: true }],
});

const ExerciseContentSchema = new mongoose.Schema({
   qna: {
      type: [QnASchema],
      validate: [(val: (typeof QnASchema)[]) => val.length === 2, 'Exactly 2 QnA items required'],
      required: true,
   },
   mcq: {
      type: [MCQSchema],
      validate: [(val: (typeof MCQSchema)[]) => val.length === 5, 'Exactly 5 MCQ items required'],
      required: true,
   },
});

const ReportSchema = new mongoose.Schema({
   review: { type: String, required: true },
   feedback: { type: String, required: true },
});

const MicroExerciseSchema = new mongoose.Schema(
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
      exercise_content: { type: ExerciseContentSchema, required: true },
      user_reflection: {
         mood_rating_after: { type: Number, min: 1, max: 10 },
         reflection: { type: String },
      },
      ai_generated_report: { type: ReportSchema, required: true },
   },
   {
      timestamps: true,
   }
);

export const MicroExercise = mongoose.model('micro-exercise', MicroExerciseSchema);
