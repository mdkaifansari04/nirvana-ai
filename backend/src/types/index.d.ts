import type { Request } from 'express';

export interface CustomRequest extends Request {
   value?: any;
}

export interface MicroExercise {
   session_goal: string;
   quick_check_in: {
      mood_rating: number;
      primary_emotion: string;
   };
   exercise_content: {
      qna: {
         question: string;
         answer: string;
      }[];
      mcq: {
         question: string;
         options: string[];
         answers: string[];
      }[];
   };
   user_reflection: {
      mood_rating_after: number;
      reflection: string;
   };
}
