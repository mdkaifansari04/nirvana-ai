'use client';

import { ArrowRight, ExternalLink, Flame, MessageSquare, PenLine } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import ActivityChart from '@/components/dashboard/activity-chart';
import CurrentMessages from '@/components/dashboard/current-messages';
import ExercisesStreak from '@/components/dashboard/exercises-streak';
import JournalingStreak from '@/components/dashboard/journaling-streak';
import MoodScoreCard from '@/components/dashboard/mood-score-card';
import QueryWrapper from '@/components/shared/wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetDashboardData } from '@/hooks/query';

export default function DashboardPage() {
   const { data, isPending, error, isError } = useGetDashboardData();

   const journals = data?.journals || [];
   const microExercises = data?.microExercises || [];
   const chats = data?.chats || [];

   return (
      <div className="container py-6 px-4 2xl:mx-auto">
         <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

         <Card>
            <CardHeader>
               <CardTitle>Activity Overview</CardTitle>
               <CardDescription>Your activity across journals, exercises, and messages</CardDescription>
            </CardHeader>
            <CardContent>
               <QueryWrapper
                  isPending={isPending}
                  isError={isError}
                  error={error}
                  data={data}
                  pendingView={<div className="h-full w-full rounded-lg bg-muted animate-pulse" />}
                  view={<ActivityChart journals={journals} microExercises={microExercises} chats={chats} />}
               />
            </CardContent>
         </Card>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
            <div className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="py-4">
                     <CardHeader>
                        <div className="flex items-center justify-between">
                           <CardTitle className="text-lg flex items-center gap-2">
                              <PenLine className="h-5 w-5 text-primary" />
                              Journaling Streak
                           </CardTitle>
                           <Link href="/dashboard/journal">
                              <Button variant="ghost" size="icon" className="rounded-full">
                                 <ExternalLink className="h-4 w-4" />
                              </Button>
                           </Link>
                        </div>
                     </CardHeader>
                     <CardContent>
                        <QueryWrapper
                           isPending={isPending}
                           isError={isError}
                           error={error}
                           data={journals}
                           pendingView={<div className="h-16 w-full rounded-lg bg-muted animate-pulse" />}
                           view={<JournalingStreak journals={journals} />}
                        />
                     </CardContent>
                  </Card>

                  <Card className="py-4">
                     <CardHeader>
                        <div className="flex items-center justify-between">
                           <CardTitle className="text-lg flex items-center gap-2">
                              <Flame className="h-5 w-5 text-chart-1" />
                              Exercises Streak
                           </CardTitle>
                           <Link href="/dashboard/exercise">
                              <Button variant="ghost" size="icon" className="rounded-full">
                                 <ExternalLink className="h-4 w-4" />
                              </Button>
                           </Link>
                        </div>
                     </CardHeader>
                     <CardContent className="pb-4">
                        <QueryWrapper
                           isPending={isPending}
                           isError={isError}
                           error={error}
                           data={microExercises}
                           pendingView={<div className="h-16 w-full rounded-lg bg-muted animate-pulse" />}
                           view={<ExercisesStreak microExercises={microExercises} />}
                        />
                     </CardContent>
                  </Card>
               </div>

               <Card className="overflow-hidden">
                  <div className="flex flex-col md:flex-row h-full">
                     <div className="md:w-2/5 p-6 py-0 flex items-center">
                        <div>
                           <h3 className="text-xl font-semibold mb-1">Current Mood</h3>
                           <p className="text-sm text-muted-foreground">Your emotional state right now</p>
                        </div>
                     </div>
                     <div className="md:w-3/5 p-6">
                        <QueryWrapper
                           isPending={isPending}
                           isError={isError}
                           error={error}
                           data={microExercises}
                           pendingView={<div className="h-16 w-full rounded-lg bg-muted animate-pulse" />}
                           view={<MoodScoreCard microExercises={microExercises} />}
                        />
                     </div>
                  </div>
               </Card>
            </div>

            <div>
               <Card className="h-full flex flex-col">
                  <CardHeader>
                     <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                           <MessageSquare className="h-5 w-5 text-chart-1" />
                           Recent Messages
                        </CardTitle>
                        <Link href="/dashboard/chat">
                           <Button variant="ghost" size="icon" className="rounded-full">
                              <ExternalLink className="h-4 w-4" />
                           </Button>
                        </Link>
                     </div>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden">
                     <QueryWrapper
                        isPending={isPending}
                        isError={isError}
                        error={error}
                        data={chats}
                        pendingView={<div className="h-40 rounded-lg bg-muted animate-pulse" />}
                        view={
                           <div className="max-h-[400px] overflow-y-auto">
                              <CurrentMessages chats={chats} />
                           </div>
                        }
                     />
                  </CardContent>
                  <CardFooter className="mt-auto">
                     <Button variant="outline" asChild className="w-full text-xs">
                        <Link href="/dashboard/chat" className="flex items-center justify-center gap-2">
                           View All Messages <ArrowRight className="h-3 w-3" />
                        </Link>
                     </Button>
                  </CardFooter>
               </Card>
            </div>
         </div>
      </div>
   );
}
