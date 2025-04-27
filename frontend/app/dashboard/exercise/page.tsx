'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getMicroServices } from '@/data-access/micro-exercises';
import type { MicroExercise } from '@/data-access/response';
import type { ExerciseSummary } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Activity, ArrowUp, Award, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ExerciseDashboardPage() {
   const { data: exercises = [], isLoading: loading } = useQuery({
      queryKey: ['userExercises'],
      queryFn: getMicroServices,
   });

   const [summary, setSummary] = useState<ExerciseSummary>({
      totalExercises: 0,
      completedThisWeek: 0,
      averageMoodImprovement: 0,
      streak: 0,
   });

   useEffect(() => {
      if (exercises.length > 0) {
         calculateSummary(exercises);
      }
   }, [exercises]);

   const calculateSummary = (exercises: MicroExercise[]) => {
      const totalExercises = exercises.length;

      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      startOfWeek.setHours(0, 0, 0, 0);

      const completedThisWeek = exercises.filter((ex) => new Date(ex.updatedAt) >= startOfWeek).length;

      const moodImprovements = exercises.map((ex) => ex.user_reflection.mood_rating_after - ex.quick_check_in.mood_rating);

      const avgImprovement = moodImprovements.length > 0 ? moodImprovements.reduce((sum, val) => sum + val, 0) / moodImprovements.length : 0;

      const streak = exercises.length > 0 ? Math.min(exercises.length, 5) : 0;

      setSummary({
         totalExercises,
         completedThisWeek,
         averageMoodImprovement: Number(avgImprovement.toFixed(1)),
         streak,
      });
   };

   // Generate activity data for the calendar
   const generateActivityData = () => {
      const data = [];
      const today = new Date();

      // Generate 180 days (6 months) of activity data
      for (let i = 180; i >= 0; i--) {
         const date = new Date(today);
         date.setDate(today.getDate() - i);

         // Check if there's an exercise on this date
         const hasExerciseOnDate = exercises.some((exercise) => {
            const exerciseDate = new Date(exercise.createdAt);
            return exerciseDate.getDate() === date.getDate() && exerciseDate.getMonth() === date.getMonth() && exerciseDate.getFullYear() === date.getFullYear();
         });

         data.push({
            date: date.toISOString().split('T')[0],
            count: hasExerciseOnDate ? 1 : 0,
            level: hasExerciseOnDate ? 1 : 0,
         });
      }

      return data;
   };

   const activityData = generateActivityData();

   if (loading) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
         </div>
      );
   }

   return (
      <div className="container py-6 px-4 2xl:mx-auto">
         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-6">
            <h1 className="text-2xl font-bold">Mental Health Assessments</h1>
            <Link href="/dashboard/exercise/new" className="w-full sm:w-auto">
               <Button className="w-full sm:w-auto">
                  <ChevronRight className="w-4 h-4" />
                  Start New Assessment
               </Button>
            </Link>
         </div>

         <div className="grid gap-6 mb-8">
            <div className="grid gap-6 md:grid-cols-3">
               {/* Summary Cards */}
               <Card className="overflow-hidden border-none shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between dark:bg-card">
                     <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
                     <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{summary.totalExercises}</div>
                     <p className="text-xs text-muted-foreground">Completed exercises</p>
                  </CardContent>
               </Card>

               <Card className="overflow-hidden border-none shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between dark:bg-card">
                     <CardTitle className="text-sm font-medium">This Week</CardTitle>
                     <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{summary.completedThisWeek}</div>
                     <p className="text-xs text-muted-foreground">Exercises completed</p>
                  </CardContent>
               </Card>

               <Card className="overflow-hidden border-none shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between dark:bg-card">
                     <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                     <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{summary.streak} days</div>
                     <p className="text-xs text-muted-foreground">Keep it going!</p>
                  </CardContent>
               </Card>
            </div>

            {/* Activity Calendar */}
            <Card className="border-none shadow-md">
               <CardHeader>
                  <CardTitle>Assessment Activity</CardTitle>
                  <CardDescription>Your assessment frequency over the past 6 months</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="relative">
                     <div className="overflow-x-auto sm:overflow-visible -mx-4 sm:-mx-6 md:-mx-8">
                        <div className="sm:min-w-0 px-4 sm:px-6 md:px-8">
                           <div className="activity-calendar-grid grid gap-1">
                              {activityData.map((day) => (
                                 <div
                                    key={day.date}
                                    className={`activity-calendar-cell h-3 w-3 rounded-sm border ${day.level === 0 ? 'bg-muted hover:bg-muted-foreground/30' : 'bg-foreground dark:bg-foreground'}`}
                                    title={`${day.date}: ${day.count} entries`}
                                 />
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="mt-2 flex items-center justify-end">
                     <div className="flex gap-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                           No entries
                           <div className="ml-1 h-2 w-2 rounded-sm bg-muted border" />
                           <div className="ml-px h-2 w-2 rounded-sm bg-foreground dark:bg-foreground border" />
                           Has entries
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* Recent exercises */}
            <Card className="border-none shadow-md">
               <CardHeader>
                  <CardTitle>Recent Assessments</CardTitle>
                  <CardDescription>Your latest mindfulness activities</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                     {exercises.length > 0 ? (
                        exercises.map((exercise) => (
                           <div key={exercise._id} className="flex flex-col justify-between p-3 border rounded-md bg-background hover:bg-muted/10 transition-colors">
                              <div>
                                 <h3 className="font-semibold">{exercise.session_goal}</h3>
                                 <div className="flex flex-wrap items-center gap-2 mt-1">
                                    <span className="text-sm text-muted-foreground">
                                       {formatDistanceToNow(new Date(exercise.updatedAt), {
                                          addSuffix: true,
                                       })}
                                    </span>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                       <ArrowUp className="w-3 h-3 mr-1" />
                                       {exercise.quick_check_in.mood_rating} → {exercise.user_reflection.mood_rating_after}
                                    </span>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                                       {exercise.quick_check_in.primary_emotion}
                                    </span>
                                 </div>
                              </div>
                              <Button variant="outline" size="sm" asChild className="mt-4">
                                 <Link href={`/dashboard/exercise/${exercise._id}`}>View Details</Link>
                              </Button>
                           </div>
                        ))
                     ) : (
                        <div className="col-span-4 flex flex-col items-center justify-center p-8 bg-muted/20 rounded-lg border">
                           <p className="text-muted-foreground mb-4">You haven't completed any assessments yet</p>
                           <Button asChild>
                              <Link href="/dashboard/exercise/new">Start Your First Assessment</Link>
                           </Button>
                        </div>
                     )}
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
