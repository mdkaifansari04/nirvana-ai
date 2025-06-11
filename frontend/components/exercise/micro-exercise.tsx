'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import type { GeneratedExercisesQuestion } from '@/data-access/response';
import { useSubmitMicroExercise } from '@/hooks/mutation';
import { useToast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/lib/utils';
import type { ExerciseContent, MCQ, QnA } from '@/types';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { MoodRating } from './mood-rating';
import { MultipleChoice } from './multiple-choice';
import { QuestionAnswer } from './question-answer';

interface MicroExerciseProps {
   exerciseContent: GeneratedExercisesQuestion;
   sessionGoal: string;
   initialMoodRating: number;
   initialEmotion: string;
   handleQnaFeedback: (qnaAnswers: { [index: number]: string }) => Promise<void>;
   handleMcqFeedback: (mcqAnswers: { [index: number]: string }) => Promise<void>;
   setShowFeedback: (show: boolean) => void;
   onComplete: (data: { qnaAnswers: { [index: number]: string }; mcqAnswers: { [index: number]: string }; moodRatingAfter: number; reflection: string }) => void;
}

export function MicroExercise({ exerciseContent, sessionGoal, initialMoodRating, initialEmotion, onComplete, handleQnaFeedback, handleMcqFeedback }: MicroExerciseProps) {
   const [currentStep, setCurrentStep] = useState(0);
   const [qnaAnswers, setQnaAnswers] = useState<{ [index: number]: string }>({});
   const [mcqAnswers, setMcqAnswers] = useState<{ [index: number]: string }>({});
   const [moodRatingAfter, setMoodRatingAfter] = useState(initialMoodRating);
   const [reflection, setReflection] = useState('');
   const { mutate: submitMicroExercise, isPending } = useSubmitMicroExercise();
   const { toast } = useToast();

   // totalSteps = 1 (QnA step) + Number of MCQ questions + 1 (Reflection step)
   const totalSteps = 1 + exerciseContent.core_exercise.mcq.length + 1;

   const handleNext = async () => {
      if (currentStep === 0) await handleQnaFeedback(qnaAnswers);
      if (currentStep === totalSteps - 2) {
         console.log('mcqAnswers', mcqAnswers);
         await handleMcqFeedback(mcqAnswers);
      }
      if (currentStep < totalSteps - 1 && isStepValid()) {
         setCurrentStep(currentStep + 1);
      } else if (currentStep === totalSteps - 1) {
         handleSubmit();
      }
   };

   const handleSubmit = () => {
      const submissionData = {
         session_goal: sessionGoal,
         quick_check_in: {
            mood_rating: initialMoodRating,
            primary_emotion: initialEmotion,
         },
         exercise_content: {
            qna: exerciseContent.core_exercise.qna.map((q, i) => ({
               question: q.question,
               answer: qnaAnswers[i] || '',
            })),
            mcq: exerciseContent.core_exercise.mcq.map((m, i) => ({
               question: m.question,
               options: m.options,
               answers: [mcqAnswers[i] || ''],
            })),
         },
         user_reflection: {
            mood_rating_after: moodRatingAfter,
            reflection,
         },
      };

      submitMicroExercise(submissionData, {
         onSuccess: () => {
            toast({
               title: 'Exercise submitted successfully',
               description: 'Your exercise has been saved to the database',
            });
            onComplete({
               qnaAnswers,
               mcqAnswers,
               moodRatingAfter,
               reflection,
            });
         },
         onError: (error) => {
            toast({
               title: 'Error submitting exercise',
               description: getErrorMessage(error),
               variant: 'destructive',
            });
         },
      });
   };

   const handleBack = () => {
      if (currentStep > 0) {
         setCurrentStep(currentStep - 1);
      }
   };

   const isStepValid = () => {
      if (currentStep === 0) {
         // QnA step
         return Object.keys(qnaAnswers).length === exerciseContent.core_exercise.qna.length && Object.values(qnaAnswers).every((answer) => answer.trim() !== '');
      }

      if (currentStep > 0 && currentStep < totalSteps - 1) {
         // MCQ step
         const mcqIndex = currentStep - 1;
         return mcqAnswers[mcqIndex] && mcqAnswers[mcqIndex].trim() !== '';
      }

      if (currentStep === totalSteps - 1) {
         // Reflection step
         return reflection.trim() !== '';
      }

      return false;
   };

   const updateQnAAnswer = (index: number, answer: string) => {
      setQnaAnswers((prev) => ({
         ...prev,
         [index]: answer,
      }));
   };

   const updateMCQAnswer = (index: number, option: string) => {
      setMcqAnswers((prev) => ({
         ...prev,
         [index]: option,
      }));
   };

   return (
      <Card className="w-full">
         <CardHeader>
            <CardTitle className="text-xl font-medium text-foreground">{sessionGoal}</CardTitle>
            <div className="flex items-center gap-2 mt-2">
               <div className="flex gap-1">
                  {Array.from({ length: totalSteps }).map((_, i) => {
                     // Using a unique ID for each step that doesn't depend on array index
                     const stepId = `step-${i}-${totalSteps}`;
                     return <div key={stepId} className={`w-2 h-2 rounded-full ${i <= currentStep ? 'bg-primary' : 'bg-muted'}`} />;
                  })}
               </div>
               <span className="text-sm text-muted-foreground">
                  {currentStep + 1}/{totalSteps}
               </span>
            </div>
         </CardHeader>
         <CardContent className="space-y-6">
            {currentStep === 0 && (
               <div className="space-y-6">
                  <h3 className="text-lg font-medium mb-3">Reflection Questions</h3>
                  {exerciseContent.core_exercise.qna.map((qa, index) => (
                     <QuestionAnswer key={`qna-${qa.question}`} question={qa.question} answer={qnaAnswers[index] || ''} onChange={(value) => updateQnAAnswer(index, value)} />
                  ))}
               </div>
            )}

            {currentStep > 0 && currentStep < totalSteps - 1 && (
               <div>
                  <h3 className="text-lg font-medium mb-3">
                     Question {currentStep} of {exerciseContent.core_exercise.mcq.length}
                  </h3>
                  {currentStep - 1 < exerciseContent.core_exercise.mcq.length ? (
                     <MultipleChoice
                        question={exerciseContent.core_exercise.mcq[currentStep - 1].question}
                        options={exerciseContent.core_exercise.mcq[currentStep - 1].options}
                        selectedOption={mcqAnswers[currentStep - 1] || ''}
                        onChange={(option) => updateMCQAnswer(currentStep - 1, option)}
                     />
                  ) : (
                     <div className="p-4 bg-muted/20 rounded-lg border text-center">
                        <p className="text-muted-foreground">Loading next question...</p>
                     </div>
                  )}
               </div>
            )}

            {currentStep === totalSteps - 1 && (
               <div className="space-y-6">
                  <div>
                     <h3 className="text-lg font-medium mb-3">How are you feeling now?</h3>
                     <MoodRating value={moodRatingAfter} onChange={setMoodRatingAfter} />
                  </div>

                  <div>
                     <h3 className="text-lg font-medium mb-3">Share your thoughts and feelings</h3>
                     <p className="text-muted-foreground text-sm mb-3">Express any insights or reflections you've had during this exercise.</p>
                     <Textarea value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="I've realized that..." className="w-full min-h-[150px]" />
                  </div>
               </div>
            )}

            <div className="flex justify-between pt-4">
               {currentStep > 0 ? (
                  <Button variant="outline" onClick={handleBack}>
                     Back
                  </Button>
               ) : (
                  <div />
               )}

               <Button onClick={handleNext} disabled={!isStepValid() || isPending}>
                  {currentStep === totalSteps - 1 ? (isPending ? 'Submitting...' : 'Complete') : 'Next'}
                  <ChevronRight className="ml-1 h-4 w-4" />
               </Button>
            </div>
         </CardContent>
      </Card>
   );
}
