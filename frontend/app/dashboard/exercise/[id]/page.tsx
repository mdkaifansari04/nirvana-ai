'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetMicroExerciseById } from '@/hooks/query';
import { format } from 'date-fns';
import {
   Activity,
   ArrowRightCircle,
   BarChart3,
   Brain,
   BrainCircuit,
   Calendar,
   CalendarDays,
   CheckCircle2,
   ChevronLeft,
   Frown,
   Lightbulb,
   MessageSquare,
   Rocket,
   Sparkles,
   TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import confetti from "canvas-confetti";
import { useEffect } from 'react';
import { SmoothCursor } from '@/components/ui/smooth-cursor';

export default function ExercisePage() {
   const params = useParams();
   const id = params.id as string;
   const { data: exercise, isLoading: exerciseLoading } = useGetMicroExerciseById(id);

   useEffect(() => {
      const hasVisited = localStorage.getItem(`exercise-${id}-visited`);
      console.log('hasVisited', hasVisited);
      if (!hasVisited) {
         showConfetti();
         localStorage.setItem(`exercise-${id}-visited`, 'true');
      }
   }, [id]);

   const formatDate = (dateString: string) => {
      try {
         return format(new Date(dateString), "PPP 'at' p");
      } catch (e) {
         return dateString;
      }
   };

   const showConfetti = () => {
      const end = Date.now() + 3 * 1000; // 3 seconds
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

      const frame = () => {
         if (Date.now() > end) return;

         confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            origin: { x: 0, y: 0.5 },
            colors: colors,
         });
         confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            origin: { x: 1, y: 0.5 },
            colors: colors,
         });

         requestAnimationFrame(frame);
      };

      frame();
   };

   const getEmotionEmoji = (emotion: string) => {
      const emotions: Record<string, string> = {
         anxious: '😰',
         anxiety: '😰',
         stress: '😓',
         stressed: '😓',
         fear: '😨',
         sad: '😢',
         sadness: '😢',
         angry: '😠',
         anger: '😠',
         frustrated: '😤',
         frustration: '😤',
         happy: '😊',
         happiness: '😊',
         joy: '😄',
         calm: '😌',
         relief: '😅',
         hope: '🙏',
         grateful: '🙏',
         gratitude: '🙏',
         confused: '😕',
         confusion: '😕',
         overwhelmed: '😩',
         tired: '😴',
         neutral: '😐',
         insecure: '😟',
      };

      const lowerEmotion = emotion?.toLowerCase() || '';
      return emotions[lowerEmotion] || '🙂';
   };

   if (exerciseLoading) {
      return (
         <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary" />
         </div>
      );
   }

   if (!exercise) {
      return (
         <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <p className="text-lg mb-4">Exercise not found</p>
            <Button asChild variant="outline">
               <Link href="/dashboard/exercise">
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back to Assessments
               </Link>
            </Button>
         </div>
      );
   }

   const moodBefore = exercise.quick_check_in.mood_rating;
   const moodAfter = exercise.user_reflection.mood_rating_after;

   let ai_summary = 'No AI analysis available';
   if (exercise?.ai_generated_report?.final_reflection?.ai_summary) {
      ai_summary = exercise.ai_generated_report.final_reflection.ai_summary;
   }

   const ai_report = exercise.ai_generated_report;

   return (
      <div className="min-h-screen bg-gradient-to-b from-background to-accent/10 py-10">
         <div className="container mx-auto px-4 max-w-6xl">
            <div className="rounded-xl mb-8 overflow-hidden shadow-md relative">
               <div className="bg-gradient-to-r from-primary/90 to-chart-1/90 p-8 text-white">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                     <SmoothCursor />
                     <div>
                        <h1 className="text-3xl font-bold tracking-tight">Assessment Report: {exercise.session_goal}</h1>
                        <p className="text-primary-foreground/90 mt-2 flex items-center">
                           <Calendar className="h-4 w-4 mr-2" />
                           {formatDate(exercise.createdAt)}
                        </p>
                     </div>
                     <Button variant="secondary" size="sm" asChild className="shadow-sm">
                        <Link href="/dashboard/exercise">
                           <ChevronLeft className="h-4 w-4" />
                           Back
                        </Link>
                     </Button>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               {/* Left column - 1/2 width */}
               <div className="md:col-span-1 space-y-6">
                  {/* Mood Summary */}
                  <Card>
                     <CardHeader>
                        <div className="flex items-center gap-2">
                           <BarChart3 className="h-5 w-5 text-primary" />
                           <CardTitle>Mood Summary</CardTitle>
                        </div>
                     </CardHeader>
                     <CardContent>
                        <div>
                           <div className="mb-5">
                              <div className="flex justify-between mb-2">
                                 <span className="text-sm font-medium">Mood Before</span>
                                 <span className="text-sm font-bold">{moodBefore}/10</span>
                              </div>
                              <Progress value={moodBefore * 10} className="h-3 rounded-full" />
                           </div>

                           <div className="mb-5">
                              <div className="flex justify-between mb-2">
                                 <span className="text-sm font-medium">Mood After</span>
                                 <span className="text-sm font-bold">{moodAfter}/10</span>
                              </div>
                              <Progress value={moodAfter * 10} className="h-3 rounded-full" />
                           </div>

                           <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg mt-4">
                              <div className="text-3xl">{getEmotionEmoji(exercise.quick_check_in.primary_emotion)}</div>
                              <div>
                                 <p className="text-sm text-muted-foreground">Primary Emotion</p>
                                 <p className="font-medium text-lg">{exercise.quick_check_in.primary_emotion}</p>
                              </div>
                           </div>
                           <div className="flex flex-col gap-1 p-3 bg-accent/50 rounded-lg mt-4">
                              <p className="text-md text-primary font-semibold flex gap-2 items-center">
                                 {' '}
                                 <BarChart3 className="w-4 h-4 text-primary" /> Emotion Shift Summary
                              </p>
                              <p className="font-medium text-sm text-muted-foreground">{ai_report.mood_summary.emotion_shift_summary}</p>
                           </div>
                           <div className="flex flex-col gap-2 p-3 bg-accent/50 rounded-lg mt-4">
                              <p className="text-md text-primary font-semibold flex gap-2 items-center">
                                 {' '}
                                 <Brain className="w-4 h-4 text-primary" /> Reflection Analysis
                              </p>
                              <p className="font-medium text-sm text-muted-foreground">{ai_report.reflection_analysis.summary}</p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Exercise QnA */}
                  <Card>
                     <CardHeader>
                        <div className="flex items-center gap-2">
                           <MessageSquare className="h-5 w-5 text-primary" />
                           <CardTitle>Exercise Q&A</CardTitle>
                        </div>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-5">
                           {exercise.exercise_content.qna.map((qna) => (
                              <div key={`qna-${qna.question}`} className="rounded-xl overflow-hidden border shadow-sm">
                                 <div className="bg-primary/10 p-4">
                                    <p className="font-semibold text-foreground">{qna.question}</p>
                                 </div>
                                 <div className="p-4">
                                    <p className="text-sm text-muted-foreground">{qna.answer}</p>
                                 </div>
                              </div>
                           ))}
                        </div>

                        <div className="bg-background rounded-xl p-5 border border-border mt-4">
                           <p className="text-base font-semibold mb-4 flex items-center gap-2.5">
                              <Lightbulb className="h-5 w-5 text-primary" />
                              Recommendations
                           </p>
                           <ul className="space-y-4">
                              <li className="flex items-start gap-4 p-4 rounded-lg border bg-white">
                                 <ArrowRightCircle className="!h-5 !w-5 text-primary" />
                                 <span className="text-sm text-foreground/90 w-full">{ai_report.exercise_qna.recommendation}</span>
                              </li>
                           </ul>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Final Reflection */}
                  <Card>
                     <CardHeader>
                        <div className="flex items-center gap-2">
                           <Sparkles className="h-5 w-5 text-primary" />
                           <CardTitle>Final Reflection</CardTitle>
                        </div>
                     </CardHeader>
                     <CardContent>
                        <Tabs defaultValue="student">
                           <TabsList className="mb-6 w-full grid grid-cols-2">
                              <TabsTrigger value="student">Student Reflection</TabsTrigger>
                              <TabsTrigger value="ai">AI Analysis</TabsTrigger>
                           </TabsList>

                           <TabsContent value="student">
                              <div className="bg-accent/50 p-5 rounded-xl border border-accent shadow-sm">
                                 <p className="text-card-foreground italic leading-relaxed">"{exercise.user_reflection.reflection}"</p>
                              </div>
                           </TabsContent>

                           <TabsContent value="ai">
                              <div className="bg-primary/5 p-5 rounded-xl border border-primary/20 shadow-sm">
                                 <div className="flex gap-3">
                                    <Sparkles className="h-5 w-5 text-primary shrink-0 mt-1" />
                                    <p className="text-card-foreground leading-relaxed">{ai_summary}</p>
                                 </div>
                              </div>
                           </TabsContent>
                        </Tabs>
                     </CardContent>
                  </Card>
               </div>

               {/* Right column - 1/2 width */}
               <div className="md:col-span-1 space-y-6">
                  {/* MCQ Evaluation */}
                  <Card>
                     <CardHeader>
                        <div className="flex items-center gap-2">
                           <BrainCircuit className="h-5 w-5 text-primary" />
                           <CardTitle>Multiple Choice</CardTitle>
                        </div>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-3">
                           {exercise.exercise_content.mcq.map((mcq) => (
                              <div key={`mcq-${mcq.question}`} className="bg-accent/50 p-3 rounded-lg border border-border flex items-start gap-2">
                                 <CheckCircle2 className="h-4 w-4 text-chart-1 mt-0.5 shrink-0" />
                                 <div>
                                    <p className="text-sm font-medium">{mcq.question}</p>
                                    <div className="text-xs text-muted-foreground mt-1 flex flex-wrap gap-1">
                                       {mcq.answers.map((answer) => (
                                          <Badge key={`answer-${mcq.question}-${answer}`} variant="secondary" className="font-normal">
                                             {answer}
                                          </Badge>
                                       ))}
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                        <div className="bg-background rounded-xl p-5 border border-border mt-4">
                           <p className="text-base font-semibold mb-4 flex items-center gap-2.5">
                              <Lightbulb className="h-5 w-5 text-primary" />
                              Recommendations
                           </p>
                           <ul className="space-y-4">
                              {ai_report.mcq_evaluation.recommendations.map((recommendation) => (
                                 <li className="flex items-start gap-4 p-4 rounded-lg border bg-white">
                                    <ArrowRightCircle className="!h-5 !w-5 text-primary" />
                                    <span className="text-sm text-foreground/90 w-full">{recommendation}</span>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Progress Insights */}
                  <Card>
                     <CardHeader>
                        <div className="flex items-center gap-2">
                           <TrendingUp className="h-5 w-5 text-primary" />
                           <CardTitle>Progress Insights</CardTitle>
                        </div>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-3">
                           <div className="bg-accent/50 rounded-xl p-4 border border-border flex items-center gap-4">
                              <div className="h-12 w-12 rounded-full bg-chart-1/20 flex items-center justify-center text-xl">
                                 <CalendarDays className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                 <p className="text-sm text-muted-foreground">Streak</p>
                                 <p className="font-medium text-lg text-chart-1">{ai_report.progress_insights.daily_streak} days</p>
                              </div>
                           </div>
                           <div className="bg-accent/50 rounded-xl p-4 border border-border flex items-center gap-4">
                              <div className="h-12 w-12 rounded-full bg-chart-1/20 flex items-center justify-center text-xl">
                                 {moodAfter > moodBefore ? (
                                    <Rocket className="h-5 w-5 text-primary" />
                                 ) : moodAfter === moodBefore ? (
                                    <Activity className="h-5 w-5 text-primary" />
                                 ) : (
                                    <Frown className="h-5 w-5 text-primary" />
                                 )}
                              </div>
                              <div>
                                 <p className="text-sm text-muted-foreground">Mood Change</p>
                                 <p className="text-2xl font-bold">
                                    {moodAfter - moodBefore > 0 ? '+' : ''}
                                    {moodAfter - moodBefore} points
                                 </p>
                              </div>
                           </div>

                           <div className="bg-accent/50 rounded-xl p-4 border border-border flex items-center gap-4">
                              <div className="h-12 w-12 rounded-full bg-chart-1/20 flex items-center justify-center text-xl">
                                 <Lightbulb className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                 <p className="text-sm text-muted-foreground">Key Insight</p>
                                 <p className="font-medium text-lg text-chart-1">
                                    {moodAfter > moodBefore
                                       ? 'This exercise improved your mood'
                                       : moodAfter === moodBefore
                                          ? 'This exercise maintained your mood'
                                          : 'This exercise helped process emotions'}
                                 </p>
                              </div>
                           </div>
                           <div className="bg-background rounded-xl p-5 border border-border">
                              <p className="text-base font-semibold mb-4 flex items-center gap-2.5">
                                 <Lightbulb className="h-5 w-5 text-primary" />
                                 Recommendations
                              </p>
                              <ul className="space-y-4">
                                 {ai_report.progress_insights.recommendations.map((recommendation) => (
                                    <li className="flex items-start gap-4 p-4 rounded-lg border bg-white">
                                       <ArrowRightCircle className="!h-5 !w-5 text-primary" />
                                       <span className="text-sm text-foreground/90 w-full">{recommendation}</span>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </div>
      </div>
   );
}
