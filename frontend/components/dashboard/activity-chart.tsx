'use client';

import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { demoDashboard } from '@/lib/demo-dashboard-data';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

export default function ActivityChart() {
   const data = demoDashboard.activityData;

   const chartConfig = demoDashboard.chartConfig;

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
