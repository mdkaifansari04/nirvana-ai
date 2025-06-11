'use client';

import { FeedbackModal } from '@/components/data-display/feedback-modal';
import { CoreExercise } from '@/components/exercise/core-exercise';
import { MicroExercise } from '@/components/exercise/micro-exercise';
import { SessionSetup } from '@/components/exercise/session-setup';
import { Feedback } from '@/data-access/response';
import { useGetFeedback } from '@/hooks/mutation';
import { useToast } from '@/hooks/use-toast';
import useMicroExerciseStore from '@/store/micro-exercise';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

enum ExerciseStage {
   SETUP = 0,
   MICRO_EXERCISE = 1,
}

export default function NewExercisePage() {
   const router = useRouter();
   const [currentStage, setCurrentStage] = useState<ExerciseStage>(ExerciseStage.SETUP);
   const [isLoading] = useState(false);

   const [sessionGoal, setSessionGoal] = useState('');
   const [moodRating, setMoodRating] = useState(5);
   const [primaryEmotion, setPrimaryEmotion] = useState('');
   const [showFeedback, setShowFeedback] = useState<boolean>(false);
   const [feedback, setFeedback] = useState<Feedback | null>(null);
   const { generatedQuestion } = useMicroExerciseStore();
   const { mutate: getFeedback } = useGetFeedback();
   const { toast } = useToast();
   const handleSessionSetup = async (data: { sessionGoal: string; moodRating: number; primaryEmotion: string }) => {
      setSessionGoal(data.sessionGoal);
      setMoodRating(data.moodRating);
      setPrimaryEmotion(data.primaryEmotion);
      setCurrentStage(ExerciseStage.MICRO_EXERCISE);
   };

   const handleMicroExerciseComplete = async () => {
      router.push('/dashboard/exercise');
   };

   const handleQnaFeedback = async (qnaAnswers: { [index: number]: string }) => {
      const userContext = `
      I have session goal: ${sessionGoal}
      I have mood rating: ${moodRating}
      I have primary emotion: ${primaryEmotion}

      I have answered the following questions:
      ${JSON.stringify(qnaAnswers)}
      `;
      getFeedback(
         { userContext },
         {
            onSuccess: (data) => {
               setFeedback(data);
               setShowFeedback(true);
            },
            onError: (error) => {
               toast({
                  title: 'Error',
                  description: 'Failed to get feedback',
                  variant: 'destructive',
               });
            },
         }
      );
   };

   const handleMcqFeedback = async (mcqAnswers: { [index: number]: string }) => {
      const userContext = `
      I have session goal: ${sessionGoal}
      I have mood rating: ${moodRating}
      I have primary emotion: ${primaryEmotion}

      I have answered the following multiple choice questions:
      ${JSON.stringify(mcqAnswers)}
      `;
      getFeedback(
         { userContext },
         {
            onSuccess: (data) => {
               setFeedback(data);
               setShowFeedback(true);
            },
            onError: (error) => {
               toast({
                  title: 'Error',
                  description: 'Failed to get feedback',
                  variant: 'destructive',
               });
            },
         }
      );
   };

   const renderCurrentStage = () => {
      if (isLoading) {
         return (
            <div className="flex flex-col items-center justify-center p-8 bg-muted/20 rounded-lg border min-h-[300px]">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
               <p className="text-muted-foreground">
                  {currentStage === ExerciseStage.SETUP && 'Generating exercise...'}
                  {currentStage === ExerciseStage.MICRO_EXERCISE && 'Generating report...'}
               </p>
            </div>
         );
      }

      switch (currentStage) {
         case ExerciseStage.SETUP:
            return <SessionSetup onComplete={handleSessionSetup} />;

         case ExerciseStage.MICRO_EXERCISE:
            return generatedQuestion ? (
               <MicroExercise
                  handleQnaFeedback={handleQnaFeedback}
                  handleMcqFeedback={handleMcqFeedback}
                  setShowFeedback={setShowFeedback}
                  exerciseContent={generatedQuestion}
                  sessionGoal={sessionGoal}
                  initialMoodRating={moodRating}
                  initialEmotion={primaryEmotion}
                  onComplete={handleMicroExerciseComplete}
               />
            ) : null;

         default:
            return null;
      }
   };

   return (
      <div className="container max-w-3xl py-8 px-4 mx-auto">
         <h1 className="text-2xl font-bold mb-6">Mental Health Assessment</h1>

         <div className="mb-6">
            <div className="flex items-center gap-2">
               <div className="flex gap-1">
                  {Object.values(ExerciseStage)
                     .filter((value) => typeof value === 'number')
                     .map((stage) => {
                        const stageNumber = Number(stage);
                        return <div key={`stage-${String(stage)}`} className={`w-3 h-3 rounded-full ${stageNumber <= currentStage ? 'bg-primary' : 'bg-muted'}`} />;
                     })}
               </div>
               <span className="text-sm text-muted-foreground">Stage {currentStage + 1} of 2</span>
            </div>
         </div>

         {renderCurrentStage()}

         {showFeedback && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-black/35">
               <FeedbackModal setShowFeedback={setShowFeedback} feedback={feedback} />
            </div>
         )}
      </div>
   );
}
