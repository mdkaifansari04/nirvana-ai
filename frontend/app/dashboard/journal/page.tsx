'use client';

import CurrentStreakLoadingView, { WordSkeletonLoadingView } from '@/components/shared/loading-view';
import QueryWrapper from '@/components/shared/wrapper';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetJournal } from '@/hooks/query';
import { chartConfig, getActivityData, getAverageLengthByMonth, getCurrentStreak, getEntriesByMonth, getEntriesWithWordCount } from '@/lib/demo-journal-data';
import { stripHtml } from '@/lib/utils';
import { format } from 'date-fns';
import { Book, Calendar, Clock, FilePlus, Trophy } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

export default function JournalPage() {
   const { data: journal, isPending, error, isError } = useGetJournal();

   const activityData = getActivityData(journal || []);
   const currentStreak = getCurrentStreak(journal || []);
   const entriesByMonth = getEntriesByMonth(journal || []);
   const averageLengthData = getAverageLengthByMonth(journal || []);
   const entriesWithWordCount = getEntriesWithWordCount(journal || []);
   const totalEntries = journal?.length || 0;

   const [sortBy, setSortBy] = useState('recent');
   const [visibleEntries, setVisibleEntries] = useState(4);

   const sortedEntries = React.useMemo(() => {
      const entries = [...entriesWithWordCount];

      if (sortBy === 'recent') {
         return entries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      if (sortBy === 'oldest') {
         return entries.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      }
      if (sortBy === 'longest') {
         return entries.sort((a, b) => b.wordCount - a.wordCount);
      }
      if (sortBy === 'shortest') {
         return entries.sort((a, b) => a.wordCount - b.wordCount);
      }

      return entries;
   }, [entriesWithWordCount, sortBy]);

   const handleViewMore = () => {
      setVisibleEntries((prev) => prev + 5);
   };

   return (
      <div className="container py-6 px-4 2xl:mx-auto">
         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-6">
            <h1 className="text-2xl font-bold">Journal Analytics</h1>
            <Link href="/dashboard/exercise/new" className="w-full sm:w-auto">
               <Button className="w-full sm:w-auto">
                  <FilePlus className="w-4 h-4" />
                  Create New Entry
               </Button>
            </Link>
         </div>

         <div className="grid gap-6 mb-8">
            <QueryWrapper
               isPending={isPending}
               isError={isError}
               error={error}
               data={journal}
               pendingView={<CurrentStreakLoadingView />}
               view={
                  <div className="grid gap-6 md:grid-cols-3">
                     {/* Summary Cards */}
                     <Card className="overflow-hidden border-none shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between dark:bg-card">
                           <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                           <Trophy className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                           <div className="text-2xl font-bold">{currentStreak} days</div>
                           <p className="text-xs text-muted-foreground">Keep it going!</p>
                        </CardContent>
                     </Card>

                     <Card className="overflow-hidden border-none shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between dark:bg-card">
                           <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
                           <Book className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                           <div className="text-2xl font-bold">{totalEntries}</div>
                           <p className="text-xs text-muted-foreground">Journal entries created</p>
                        </CardContent>
                     </Card>

                     <Card className="overflow-hidden border-none shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between dark:bg-card">
                           <CardTitle className="text-sm font-medium">This Month</CardTitle>
                           <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                           <div className="text-2xl font-bold">{entriesByMonth[entriesByMonth.length - 1].entries}</div>
                           <p className="text-xs text-muted-foreground">Entries in {entriesByMonth[entriesByMonth.length - 1].month}</p>
                        </CardContent>
                     </Card>
                  </div>
               }
            />

            {/* Activity Calendar */}
            <Card className="border-none shadow-md">
               <CardHeader>
                  <CardTitle>Writing Activity</CardTitle>
                  <CardDescription>Your journaling frequency over the past 6 months</CardDescription>
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
         </div>

         {/* Content Insights Section */}
         <div className="grid gap-6 mb-8">
            <h2 className="text-xl font-semibold">Content Insights</h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
               {/* Entries by Month */}
               <Card className="border-none shadow-md">
                  <CardHeader>
                     <CardTitle>Monthly Entries</CardTitle>
                     <CardDescription>Total journal entries per month</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <ChartContainer config={chartConfig}>
                        <BarChart
                           accessibilityLayer
                           data={entriesByMonth.map((m) => ({
                              month: m.month,
                              entries: m.entries,
                           }))}
                        >
                           <CartesianGrid vertical={false} />
                           <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                           <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                           <Bar dataKey="entries" fill="var(--color-chart-1)" radius={8} />
                        </BarChart>
                     </ChartContainer>
                  </CardContent>
               </Card>

               {/* Average Length Chart */}
               <Card className="border-none shadow-md">
                  <CardHeader>
                     <CardTitle>Total Word Count</CardTitle>
                     <CardDescription>Total words written each month</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <ChartContainer config={chartConfig}>
                        <LineChart
                           data={averageLengthData.map((m) => ({
                              month: m.month,
                              totalWords: m.totalWords,
                           }))}
                           margin={{ left: 12, right: 12 }}
                           accessibilityLayer
                        >
                           <CartesianGrid vertical={false} />
                           <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
                           <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                           <Line type="linear" dataKey="totalWords" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
                        </LineChart>
                     </ChartContainer>
                  </CardContent>
               </Card>
            </div>
         </div>

         {/* Recent Entries Section */}
         <div className="grid gap-6">
            <Card className="border-none shadow-md">
               <CardHeader>
                  <div className="flex items-center justify-between">
                     <CardTitle>Journal Entries</CardTitle>
                     <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Sort by:</span>
                        <Select value={sortBy} onValueChange={setSortBy}>
                           <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Sort by" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="recent">Most Recent</SelectItem>
                              <SelectItem value="oldest">Oldest First</SelectItem>
                              <SelectItem value="longest">Longest First</SelectItem>
                              <SelectItem value="shortest">Shortest First</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                  </div>
                  <CardDescription>Your personal reflection and writing activities</CardDescription>
               </CardHeader>
               <CardContent>
                  <QueryWrapper
                     isPending={isPending}
                     isError={isError}
                     error={error}
                     data={journal}
                     pendingView={<WordSkeletonLoadingView />}
                     view={
                        <>
                           {sortedEntries.length === 0 && (
                              <div className="flex justify-center items-center h-full">
                                 <p className="text-muted-foreground">No entries found</p>
                              </div>
                           )}
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              {sortedEntries.slice(0, visibleEntries).map((entry) => (
                                 <Link key={entry._id} href={`/dashboard/journal/${entry._id}`} className="block">
                                    <div className="flex flex-col justify-between p-3 border rounded-md bg-background hover:bg-muted/10 transition-colors h-full">
                                       <div>
                                          <div className="flex items-center justify-between mb-2">
                                             <h3 className="font-semibold truncate">{entry.title}</h3>
                                             <Badge variant="outline" className="ml-2">
                                                {entry.wordCount} words
                                             </Badge>
                                          </div>
                                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{stripHtml(entry.content)}</p>
                                          <div className="flex items-center text-xs text-muted-foreground">
                                             <Clock className="mr-1 h-3 w-3" />
                                             {format(new Date(entry.createdAt), 'MMM d, yyyy')}
                                          </div>
                                       </div>
                                    </div>
                                 </Link>
                              ))}
                           </div>
                        </>
                     }
                  />

                  {sortedEntries.length > visibleEntries && (
                     <Button variant="outline" className="mt-2" onClick={handleViewMore}>
                        View More Entries
                     </Button>
                  )}
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
