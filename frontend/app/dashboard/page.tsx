import { ArrowRight, ExternalLink, Flame, MessageSquare, PenLine } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Suspense } from "react";

import ActivityChart from "@/components/dashboard/activity-chart";
import CurrentMessages from "@/components/dashboard/current-messages";
import ExercisesStreak from "@/components/dashboard/exercises-streak";
import JournalingStreak from "@/components/dashboard/journaling-streak";
import MoodScoreCard from "@/components/dashboard/mood-score-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="container py-6 px-4 2xl:mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Activity Overview</CardTitle>
          <CardDescription>Your activity across journals, exercises, and messages</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <Suspense fallback={<div className="h-full w-full rounded-lg bg-muted animate-pulse" />}>
            <ActivityChart />
          </Suspense>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Suspense fallback={<div className="h-48 rounded-lg bg-muted animate-pulse" />}>
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
                  <JournalingStreak />
                </CardContent>
              </Card>
            </Suspense>

            <Suspense fallback={<div className="h-48 rounded-lg bg-muted animate-pulse" />}>
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
                  <ExercisesStreak />
                </CardContent>
              </Card>
            </Suspense>
          </div>

          <Suspense fallback={<div className="h-48 rounded-lg bg-muted animate-pulse" />}>
            <Card className="overflow-hidden">
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-2/5 p-6 flex items-center">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Current Mood</h3>
                    <p className="text-sm text-muted-foreground">Your emotional state right now</p>
                  </div>
                </div>
                <div className="md:w-3/5 p-6">
                  <MoodScoreCard />
                </div>
              </div>
            </Card>
          </Suspense>
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
              <Suspense fallback={<div className="h-40 rounded-lg bg-muted animate-pulse" />}>
                <div className="max-h-[400px] overflow-y-auto">
                  <CurrentMessages />
                </div>
              </Suspense>
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
