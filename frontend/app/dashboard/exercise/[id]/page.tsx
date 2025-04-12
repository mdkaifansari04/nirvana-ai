'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { demoExercises } from '@/lib/demo-exercise-data';
import type { MicroExercise } from '@/types';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ExercisePage() {
   const params = useParams();
   const router = useRouter();
   const exerciseId = params.id as string;

   const [exercise, setExercise] = useState<MicroExercise | null>(null);
   const [loading, setLoading] = useState(true);
   const [currentStep, setCurrentStep] = useState(0);

   const [sessionGoal, setSessionGoal] = useState('');
   const [moodRating, setMoodRating] = useState(5);
   const [primaryEmotion, setPrimaryEmotion] = useState('');
   const [qnaAnswers, setQnaAnswers] = useState<{ [index: number]: string }>({});
   const [mcqAnswers, setMcqAnswers] = useState<{ [index: number]: string[] }>({});
   const [moodRatingAfter, setMoodRatingAfter] = useState(5);
   const [reflection, setReflection] = useState('');

   useEffect(() => {
      const exerciseData = demoExercises.find((e) => e.id === exerciseId);

      if (exerciseData) {
         setExercise(exerciseData);

         // Only prefill values if it's not "1" (new assessment)
         if (exerciseId !== '1') {
            if (exerciseData.session_goal) setSessionGoal(exerciseData.session_goal);
            if (exerciseData.quick_check_in) {
               setMoodRating(exerciseData.quick_check_in.mood_rating);
               setPrimaryEmotion(exerciseData.quick_check_in.primary_emotion);
            }
            if (exerciseData.user_reflection) {
               setMoodRatingAfter(exerciseData.user_reflection.mood_rating_after);
               setReflection(exerciseData.user_reflection.reflection);
            }

            const qaAnswers: { [index: number]: string } = {};
            exerciseData.exercise_content.qna.forEach((qa, index) => {
               qaAnswers[index] = qa.answer;
            });
            setQnaAnswers(qaAnswers);

            const mcAnswers: { [index: number]: string[] } = {};
            exerciseData.exercise_content.mcq.forEach((mc, index) => {
               mcAnswers[index] = mc.answers;
            });
            setMcqAnswers(mcAnswers);
         }
      } else if (exerciseId === '1') {
         // If starting a new assessment, use the latest exercise template
         // but don't prefill any answers
         const latestExercise = [...demoExercises].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];

         if (latestExercise) {
            const newExercise = {
               ...latestExercise,
               id: '1',
               session_goal: '',
               quick_check_in: {
                  ...latestExercise.quick_check_in,
                  mood_rating: 5,
                  primary_emotion: '',
               },
               exercise_content: {
                  ...latestExercise.exercise_content,
                  qna: latestExercise.exercise_content.qna.map((q) => ({
                     ...q,
                     answer: '',
                  })),
                  mcq: latestExercise.exercise_content.mcq.map((q) => ({
                     ...q,
                     answers: [],
                  })),
               },
               user_reflection: {
                  mood_rating_after: 5,
                  reflection: '',
               },
            };
            setExercise(newExercise);
         }
      }

      setLoading(false);
   }, [exerciseId]);

   // Get total number of steps
   const getTotalSteps = () => {
      if (!exercise) return 0;

      return 9; // Initial + QnA + 5 MCQ + Reflection + Report
   };

   const isStepValid = () => {
      switch (currentStep) {
         case 0:
            return sessionGoal.trim() !== '' && primaryEmotion !== '';
         case 1:
            return Object.values(qnaAnswers).every((answer) => answer.trim() !== '');
         case 2:
         case 3:
         case 4:
         case 5:
         case 6: {
            const mcqIndex = currentStep - 2;
            return mcqAnswers[mcqIndex] && mcqAnswers[mcqIndex].length > 0;
         }
         case 7:
            return reflection.trim() !== '';
         case 8:
            return true; // Report step is always valid
         default:
            return false;
      }
   };

   const handleNext = () => {
      if (currentStep < getTotalSteps() - 1 && isStepValid()) {
         setCurrentStep(currentStep + 1);
      }
   };

   const handleBack = () => {
      if (currentStep > 0) {
         setCurrentStep(currentStep - 1);
      }
   };

   const handleSave = async () => {
      // Console log user answers when submitted
      console.log('User exercise answers:', {
         id: exerciseId,
         session_goal: sessionGoal,
         quick_check_in: {
            mood_rating: moodRating,
            primary_emotion: primaryEmotion,
         },
         exercise_content: {
            qna: exercise?.exercise_content.qna.map((q, i) => ({
               question: q.question,
               answer: qnaAnswers[i] || '',
            })),
            mcq: exercise?.exercise_content.mcq.map((q, i) => ({
               question: q.question,
               options: q.options,
               answers: mcqAnswers[i] || [],
            })),
         },
         user_reflection: {
            mood_rating_after: moodRatingAfter,
            reflection: reflection,
         },
      });

      // Navigate back to the exercise dashboard
      router.push('/dashboard/exercise');
   };

   if (loading) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            <p>Loading exercise...</p>
         </div>
      );
   }

   if (!exercise) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            <p>Exercise not found.</p>
         </div>
      );
   }

   // If viewing an existing assessment (not ID 1), only show answers and report
   if (exerciseId !== '1' && exercise.session_goal) {
      return (
         <div className="container max-w-3xl py-8 px-4 mx-auto">
            <div className="flex flex-row justify-between">
               <h1 className="text-2xl font-bold mb-6">Assessment Summary</h1>
               <Button onClick={() => router.push('/dashboard/exercise')} variant="outline">
                  <ChevronLeft className="ml-1 h-4 w-4" />
                  Back to Assessments
               </Button>
            </div>

            <Card className="mb-6">
               <CardHeader>
                  <CardTitle className="text-xl">{exercise.session_goal}</CardTitle>
               </CardHeader>
               <hr />
               <CardContent className="space-y-6">
                  <div>
                     <h2 className="font-medium mb-2">Initial Mood</h2>
                     <div className="flex items-center gap-2">
                        <span>{exercise.quick_check_in.mood_rating}/10</span>
                        <span className="text-muted-foreground">{exercise.quick_check_in.primary_emotion}</span>
                     </div>
                  </div>

                  {/* QnA Answers */}
                  <div>
                     <h2 className="font-medium mb-3">Reflection Questions</h2>
                     {exercise.exercise_content.qna.map((qa, index) => (
                        <div key={`qna-${qa.question}`} className="mb-4 bg-muted/20 p-3 rounded-md border">
                           <h3 className="font-medium text-base">{qa.question}</h3>
                           <hr className="my-4" />
                           <p className="mt-1 text-sm">{qa.answer}</p>
                        </div>
                     ))}
                  </div>

                  {/* MCQ Answers */}
                  <div>
                     <h2 className="font-medium mb-3">Multiple Choice Questions</h2>
                     {exercise.exercise_content.mcq.map((mc, index) => (
                        <div key={`mcq-${mc.question}`} className="mb-4 bg-muted/20 p-3 rounded-md border">
                           <h3 className="font-medium text-base">{mc.question}</h3>
                           <hr className="my-4" />
                           <div>
                              {mc.answers.map((answer) => (
                                 <div key={`answer-${answer}`} className="flex items-center gap-2 mb-1 text-sm">
                                    <Check className="w-4 h-4 text-primary" />
                                    <span>{answer}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* User Reflection */}
                  <div>
                     <h2 className="font-medium mb-2">Final Mood</h2>
                     <div className="flex items-center gap-2 mb-3">
                        <span>{exercise.user_reflection.mood_rating_after}/10</span>
                        {exercise.user_reflection.mood_rating_after > exercise.quick_check_in.mood_rating && (
                           <span className="text-green-600">
                              (+
                              {exercise.user_reflection.mood_rating_after - exercise.quick_check_in.mood_rating})
                           </span>
                        )}
                     </div>
                     <h3 className="font-medium text-sm mb-1">Your Reflection</h3>
                     <p className="bg-muted/20 p-3 rounded-md border">{exercise.user_reflection.reflection}</p>
                  </div>

                  {/* AI Report */}
                  <div className="pt-4 border-t">
                     <h2 className="font-medium mb-3">AI Assessment Report</h2>
                     <div className="bg-muted/30 p-4 rounded-md mb-4 border">
                        <h3 className="font-medium mb-2 text-base">Summary & Review</h3>
                        <p className="text-muted-foreground text-sm">{exercise.ai_generated_report.review}</p>
                     </div>

                     <div className="bg-muted/30 p-4 rounded-md mb-4 border">
                        <h3 className="font-medium mb-2 text-base">Recommendations</h3>
                        <p className="text-muted-foreground text-sm">{exercise.ai_generated_report.feedback}</p>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      );
   }

   return (
      <div className="container max-w-3xl py-8 px-4 mx-auto">
         <h1 className="text-2xl font-bold mb-6">Mental Health Assessment</h1>

         <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-1">
               {Array.from({ length: getTotalSteps() }).map((_, i) => (
                  <div key={`step-indicator-${i}-${currentStep}`} className={`w-2 h-2 rounded-full ${i <= currentStep ? 'bg-primary' : 'bg-muted'}`} />
               ))}
            </div>
            <span className="text-sm text-muted-foreground">
               {currentStep + 1}/{getTotalSteps()}
            </span>
         </div>

         <Card className="mb-6">
            <CardContent className="pt-6">
               {currentStep === 0 && (
                  <div className="space-y-6">
                     <div>
                        <h2 className="text-lg font-medium mb-3">What is your goal for today's exercise?</h2>
                        <Input value={sessionGoal} onChange={(e) => setSessionGoal(e.target.value)} placeholder="e.g., Managing anxiety, Improving sleep, etc." className="w-full" />
                     </div>

                     <div>
                        <h2 className="text-lg font-medium mb-3">What is your primary emotion right now?</h2>
                        <div className="grid grid-cols-5 gap-2 mb-4">
                           {['Sad', 'OK', 'Neutral', 'Happy', 'Joy'].map((emotion, index) => (
                              <button
                                 key={emotion}
                                 type="button"
                                 onClick={() => setPrimaryEmotion(emotion)}
                                 className={`p-3 rounded flex flex-col items-center justify-center transition-all
                              ${primaryEmotion === emotion ? 'bg-primary text-primary-foreground font-medium' : 'bg-background border hover:border-primary'}`}
                              >
                                 <span className="text-xl mb-1">{index === 0 ? '😔' : index === 1 ? '😐' : index === 2 ? '😶' : index === 3 ? '😊' : '😁'}</span>
                                 <span className="text-sm">{emotion}</span>
                              </button>
                           ))}
                        </div>
                     </div>

                     <div>
                        <h2 className="text-lg font-medium mb-3">How would you rate your mental well-being?</h2>
                        <div className="flex justify-between w-full mb-2">
                           {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <button
                                 key={num}
                                 type="button"
                                 onClick={() => setMoodRating(num)}
                                 className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                              ${moodRating === num ? 'bg-primary text-primary-foreground font-medium' : 'bg-background border hover:border-primary'}`}
                              >
                                 {num}
                              </button>
                           ))}
                        </div>
                     </div>
                  </div>
               )}

               {currentStep === 1 && (
                  <div className="space-y-6">
                     <h2 className="text-lg font-medium mb-3">Reflection Questions</h2>
                     {exercise.exercise_content.qna.map((qa, index) => (
                        <div key={`qna-input-${qa.question}`} className="mb-6">
                           <h3 className="font-medium mb-2">{qa.question}</h3>
                           <Textarea
                              value={qnaAnswers[index] || ''}
                              onChange={(e) => setQnaAnswers({ ...qnaAnswers, [index]: e.target.value })}
                              placeholder="Type your answer here..."
                              className="w-full min-h-[120px]"
                           />
                        </div>
                     ))}
                  </div>
               )}

               {currentStep >= 2 && currentStep <= 6 && (
                  <div>
                     <h2 className="text-lg font-medium mb-3">{exercise.exercise_content.mcq[currentStep - 2].question}</h2>
                     <div className="space-y-2">
                        {exercise.exercise_content.mcq[currentStep - 2].options.map((option) => (
                           <button
                              key={`mcq-option-${option}`}
                              type="button"
                              onClick={() => {
                                 const current = mcqAnswers[currentStep - 2] || [];
                                 const newAnswers = current.includes(option) ? current.filter((item) => item !== option) : [...current, option];
                                 setMcqAnswers({ ...mcqAnswers, [currentStep - 2]: newAnswers });
                              }}
                              className={`w-full text-left p-3 rounded border transition-all flex items-center
                            ${mcqAnswers[currentStep - 2]?.includes(option) ? 'bg-primary/10 border-primary text-foreground font-medium' : 'bg-background border hover:border-primary'}`}
                           >
                              <span
                                 className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center
                            ${mcqAnswers[currentStep - 2]?.includes(option) ? 'bg-primary text-primary-foreground' : 'border'}`}
                              >
                                 {mcqAnswers[currentStep - 2]?.includes(option) && <Check className="w-3 h-3" />}
                              </span>
                              {option}
                           </button>
                        ))}
                     </div>
                  </div>
               )}

               {currentStep === 7 && (
                  <div className="space-y-6">
                     <div>
                        <h2 className="text-lg font-medium mb-3">How are you feeling now?</h2>
                        <div className="flex justify-between w-full mb-4">
                           {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <button
                                 key={num}
                                 type="button"
                                 onClick={() => setMoodRatingAfter(num)}
                                 className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                                    ${moodRatingAfter === num ? 'bg-primary text-primary-foreground font-medium' : 'bg-background border hover:border-primary'}`}
                              >
                                 {num}
                              </button>
                           ))}
                        </div>
                     </div>

                     <div>
                        <h2 className="text-lg font-medium mb-3">Share your thoughts and feelings</h2>
                        <p className="text-muted-foreground text-sm mb-3">Express any insights or reflections you've had during this exercise.</p>
                        <Textarea value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="I've realized that..." className="w-full min-h-[150px]" />
                     </div>
                  </div>
               )}

               {currentStep === 8 && (
                  <div className="space-y-4">
                     <h2 className="text-lg font-medium mb-3">Your Assessment Report</h2>

                     <div className="bg-muted/30 p-4 rounded-md mb-4">
                        <h3 className="font-medium mb-2">Summary & Review</h3>
                        <p className="text-muted-foreground">{exercise.ai_generated_report.review}</p>
                     </div>

                     <div className="bg-muted/30 p-4 rounded-md mb-4">
                        <h3 className="font-medium mb-2">Recommendations</h3>
                        <p className="text-muted-foreground">{exercise.ai_generated_report.feedback}</p>
                     </div>

                     <div className="pt-4 border-t">
                        <p className="text-sm text-muted-foreground italic">
                           This report was generated based on your responses to help guide your mental wellness journey. Consider discussing these insights with a professional if needed.
                        </p>
                     </div>
                  </div>
               )}
            </CardContent>
         </Card>

         {/* Navigation buttons */}
         <div className="flex justify-between">
            {currentStep > 0 ? (
               <Button variant="outline" onClick={handleBack}>
                  Back
               </Button>
            ) : (
               <div />
            )}

            {currentStep < getTotalSteps() - 1 ? (
               <Button onClick={handleNext} disabled={!isStepValid()}>
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
               </Button>
            ) : (
               <Button onClick={handleSave}>
                  Submit Assessment
                  <ChevronRight className="ml-1 h-4 w-4" />
               </Button>
            )}
         </div>
      </div>
   );
}
