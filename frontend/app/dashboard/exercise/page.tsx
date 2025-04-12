import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { demoExerciseSummary, demoExercises, getActivityData } from '@/lib/demo-exercise-data';
import { formatDistanceToNow } from 'date-fns';
import { Activity, ArrowUp, Award, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ExerciseDashboardPage() {
   const activityData = getActivityData();

   return (
      <div className="container py-6 px-4 2xl:mx-auto">
         <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Mental Health Assessments</h1>
            <Link href="/dashboard/exercise/new">
               <Button>
                  <ChevronRight className="w-4 h-4" />
                  Start New Assessment
               </Button>
            </Link>
         </div>

         <div className="grid gap-6 mb-8">
            <div className="grid gap-6 md:grid-cols-3">
               {/* Summary Cards */}
               <Card className="overflow-hidden border-none shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between bg-white dark:bg-card">
                     <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
                     <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{demoExerciseSummary.totalExercises}</div>
                     <p className="text-xs text-muted-foreground">Completed exercises</p>
                  </CardContent>
               </Card>

               <Card className="overflow-hidden border-none shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between bg-white dark:bg-card">
                     <CardTitle className="text-sm font-medium">This Week</CardTitle>
                     <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{demoExerciseSummary.completedThisWeek}</div>
                     <p className="text-xs text-muted-foreground">Exercises completed</p>
                  </CardContent>
               </Card>

               <Card className="overflow-hidden border-none shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between bg-white dark:bg-card">
                     <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                     <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{demoExerciseSummary.streak} days</div>
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
                     {demoExercises.map((exercise) => (
                        <div key={exercise.id} className="flex flex-col justify-between p-3 border rounded-md bg-background hover:bg-muted/10 transition-colors">
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
                                 <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">{exercise.quick_check_in.primary_emotion}</span>
                              </div>
                           </div>
                           <Button variant="outline" size="sm" asChild className="mt-4">
                              <Link href={`/dashboard/exercise/${exercise.id}`}>View Details</Link>
                           </Button>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Tips section */}
         <div className="grid gap-6">
            <h2 className="text-xl font-semibold">Assessment Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <Card className="border-none shadow-md">
                  <CardHeader>
                     <CardTitle>Consistency is Key</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-muted-foreground">Try to complete at least one exercise daily, even if it's brief. Regular practice builds mental resilience.</p>
                  </CardContent>
               </Card>

               <Card className="border-none shadow-md">
                  <CardHeader>
                     <CardTitle>Create a Quiet Space</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-muted-foreground">Find a distraction-free environment for your exercises to maximize focus and benefits.</p>
                  </CardContent>
               </Card>

               <Card className="border-none shadow-md">
                  <CardHeader>
                     <CardTitle>Be Honest in Responses</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-muted-foreground">The more truthful your answers, the more personalized and helpful your exercise insights will be.</p>
                  </CardContent>
               </Card>

               <Card className="border-none shadow-md">
                  <CardHeader>
                     <CardTitle>Review Your Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-muted-foreground">Regularly look back at previous exercises to identify patterns and track your improvement.</p>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}
