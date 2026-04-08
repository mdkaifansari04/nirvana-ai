import { createApiClient } from './client';
import type { Feedback, GeneratedExercisesQuestion, MicroExercise, MicroExerciseReport, Response } from './response';

const microExerciseApi = createApiClient('/micro-exercises');

export const getMicroServices = async () => {
   const { data } = await microExerciseApi.get<Response<MicroExercise[]>>('/');
   return data.data;
};

export const getMicroExerciseReportById = async (id: string) => {
   const { data } = await microExerciseApi.get<Response<MicroExerciseReport>>(`/report/${id}`);
   return data.data;
};

export const generateMicroExercise = async (body: { sessionGoal: string; primaryEmotion: string; mentalHealthRate: number }) => {
   const { data } = await microExerciseApi.post<Response<GeneratedExercisesQuestion>>('/generate', body);
   return data.data;
};

export const submitMicroExercise = async (body: {
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
}) => {
   const { data } = await microExerciseApi.post<Response<MicroExercise>>('/', body);
   return data.data;
};

export const getFeedback = async (body: {
   userContext: string;
}) => {
   const { data } = await microExerciseApi.post<Response<Feedback>>('/feedback', body);
   return data.data;
};

export const getMicroExerciseReportByExerciseId = async (exerciseId: string) => {
   const { data } = await microExerciseApi.get<Response<MicroExerciseReport>>(`/report/${exerciseId}`);
   return data.data;
};

export const getMicroExerciseById = async (id: string) => {
   const { data } = await microExerciseApi.get<Response<MicroExercise>>(`/${id}`);
   return data.data;
};
