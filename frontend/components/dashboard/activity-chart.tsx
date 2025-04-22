'use client';

import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { Chat, Journal, MicroExercise } from '@/data-access/response';
import { format, subDays } from 'date-fns';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

interface ActivityChartProps {
   journals: Journal[];
   microExercises: MicroExercise[];
   chats: Chat[];
}

export default function ActivityChart({ journals, microExercises, chats }: ActivityChartProps) {
   const today = new Date();

   const dates = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(today, i);
      return format(date, 'yyyy-MM-dd');
   }).reverse();

   const data = dates.map((date) => ({
      date,
      journal: 0,
      exercise: 0,
      message: 0,
   }));

   journals.forEach((journal) => {
      const journalDate = format(new Date(journal.createdAt), 'yyyy-MM-dd');
      const dataPoint = data.find((d) => d.date === journalDate);
      if (dataPoint) {
         dataPoint.journal += 1;
      }
   });

   microExercises.forEach((exercise) => {
      const exerciseDate = format(new Date(exercise.createdAt), 'yyyy-MM-dd');
      const dataPoint = data.find((d) => d.date === exerciseDate);
      if (dataPoint) {
         dataPoint.exercise += 1;
      }
   });

   chats.forEach((chat) => {
      const chatDate = format(new Date(chat.createdAt), 'yyyy-MM-dd');
      const dataPoint = data.find((d) => d.date === chatDate);
      if (dataPoint) {
         dataPoint.message += 1;
      }
   });

   const chartConfig = {
      journal: {
         label: 'Journal Entries',
         color: 'hsl(var(--chart-1))',
      },
      exercise: {
         label: 'Exercises',
         color: 'hsl(var(--chart-2))',
      },
      message: {
         label: 'Messages',
         color: 'hsl(var(--chart-4))',
      },
   };

   if (!journals.length && !microExercises.length && !chats.length) {
      return (
         <div className="container py-6 px-4 2xl:mx-auto">
            <h1 className="text-lg text-center">No data available to show</h1>
         </div>
      );
   }

   return (
      <div className="h-full flex flex-col">
         <ChartContainer config={chartConfig} className="h-full flex-1">
            <AreaChart data={data} margin={{ top: 10, right: 12, left: -20, bottom: 0 }} accessibilityLayer>
               <CartesianGrid vertical={false} />
               <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(date) => {
                     const d = new Date(date);
                     return `${d.getDate()}/${d.getMonth() + 1}`;
                  }}
               />
               <YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={5} />
               <ChartTooltip
                  cursor={false}
                  content={({ active, payload, label }) => (
                     <ChartTooltipContent
                        active={active}
                        payload={payload}
                        label={label}
                        labelFormatter={(value) => {
                           const date = new Date(value as string);
                           return date.toLocaleDateString('en-US', {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                           });
                        }}
                     />
                  )}
               />
               <defs>
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                     <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                     <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
                  </linearGradient>
               </defs>
               <Area type="natural" dataKey="message" stackId="1" fill="#a58c77" stroke="#a58c77" />
               <Area type="natural" dataKey="exercise" stackId="1" fill="#c7a78b" stroke="#c7a78b" />
               <Area type="natural" dataKey="journal" stackId="1" fill="#e3c1a0" stroke="#e3c1a0" />
               <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
         </ChartContainer>
      </div>
   );
}
