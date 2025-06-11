export interface Response<T = unknown> {
   data: T;
   message: string;
   status: number;
}

export interface Chatbot {
   _id: string;
   name: string;
   system_prompt: string;
   slug: string;
   image: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
}

export interface Chat {
   _id: string;
   userClerkId: string;
   chatbot: string;
   messages: Array<{
      sender: 'user' | 'model';
      text: string;
      timestamps: string;
      _id: string;
   }>;
   createdAt: string;
   updatedAt: string;
   __v: number;
}

export interface Journal {
   _id: string;
   userClerkId: string;
   title: string;
   content: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
}

export interface MicroExercise {
   _id: string;
   userClerkId: string;
   session_goal: string;
   quick_check_in: {
      mood_rating: number;
      primary_emotion: string;
   };
   user_reflection: {
      mood_rating_after: number;
      reflection: string;
   };
   exercise_content: {
      _id: string;
      qna: {
         _id: string;
         question: string;
         answer: string;
      }[];
      mcq: {
         _id: string;
         question: string;
         options: string[];
         answers: string[];
      }[];
   };
   ai_generated_report: MicroExerciseReport;
   createdAt: string;
   updatedAt: string;
   __v: number;
}

export interface MicroExerciseReport {
   _id: string;
   userClerkId: string;
   createdAt: string;
   updatedAt: string;
   __v: number;
   header: {
      student_name: string;
      session_date: string; // ISO format: YYYY-MM-DD
      session_id: string;
      session_goal: string;
   };
   mood_summary: {
      mood_before: number;
      mood_after: number;
      primary_emotion: string;
      mood_delta: number;
      emotion_shift_summary: string;
   };
   reflection_analysis: {
      summary: string;
   };
   exercise_qna: {
      qna_analysis: {
         _id: string;
         question: string;
         answer: string;
         tags: string[];
      }[];
      coping_quality: string;
      recommendation: string;
   };
   mcq_evaluation: {
      total_mcqs: number;
      correct_answers: number;
      score_percent: number;
      feedback: string;
      recommendations: string[];
   };
   final_reflection: {
      student_reflection: string;
      ai_summary: string;
   };
   progress_insights: {
      progress_level: 'Improving' | 'Stable' | 'Declining';
      daily_streak: number;
      recommendations: string[];
   };
}

export interface GeneratedExercisesQuestion {
   session_goal: string;
   core_exercise: {
      qna: { question: string }[];
      mcq: { question: string; options: string[] }[];
   };
}

export interface WellnessCard {
   quote: string;
   action: string;
   emoji: string;
   category: string;
}

export interface Feedback {
   emoji: string;
   message: string;
}
