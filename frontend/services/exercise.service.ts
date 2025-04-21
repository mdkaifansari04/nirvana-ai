import { demoExercises } from '@/lib/demo-exercise-data';
import type { AIReport, ExerciseContent, MicroExercise } from '@/types';

// this is a mock exercise service that mimics API calls
// in a real application, this would be replaced with actual API calls

const generateId = () => {
   return Math.random().toString(36).substring(2, 9);
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const ExerciseService = {
   getUserExercises: async (userId: string): Promise<MicroExercise[]> => {
      await delay(500);
      return demoExercises;
   },

   getExerciseById: async (exerciseId: string): Promise<MicroExercise | null> => {
      await delay(300);
      return demoExercises.find((ex) => ex.id === exerciseId) || null;
   },

   // generate a core exercise based on session goal
   generateCoreExercise: async (sessionGoal: string): Promise<ExerciseContent> => {
      await delay(1000);
      const templateExercise = demoExercises[Math.floor(Math.random() * (demoExercises.length - 1))];
      return templateExercise.exercise_content;
   },

   // generate a report based on the completed micro exercise
   generateReport: async (microExercise: Partial<MicroExercise>): Promise<AIReport> => {
      await delay(1500);
      const templateExercise = demoExercises[Math.floor(Math.random() * (demoExercises.length - 1))];
      return templateExercise.ai_generated_report;
   },

   // save a completed exercise with report
   saveExerciseWithReport: async (exercise: Partial<MicroExercise>): Promise<MicroExercise> => {
      await delay(800);

      // create a new exercise with the provided data
      const newExercise: MicroExercise = {
         id: generateId(),
         userClerkId: 'user_123',
         session_goal: exercise.session_goal || '',
         quick_check_in: exercise.quick_check_in || {
            mood_rating: 5,
            primary_emotion: '',
         },
         exercise_content: exercise.exercise_content || {
            qna: [],
            mcq: [],
         },
         user_reflection: exercise.user_reflection || {
            mood_rating_after: 5,
            reflection: '',
         },
         ai_generated_report: exercise.ai_generated_report || {
            review: '',
            feedback: '',
         },
         createdAt: new Date().toISOString(),
         updatedAt: new Date().toISOString(),
      };

      console.log('Exercise saved:', newExercise);

      return newExercise;
   },
};
