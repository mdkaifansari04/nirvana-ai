'use client';

import { demoDashboard } from '@/lib/demo-dashboard-data';
import { CalendarDays, Trophy } from 'lucide-react';

export default function ExercisesStreak() {
   const streak = demoDashboard.exerciseStreak;

   return (
      <div className="flex flex-col items-center justify-center text-center space-y-2">
         <div className="flex items-center justify-center w-16 h-16 rounded-full bg-chart-1/10">
            <Trophy className="w-8 h-8 text-chart-1" />
         </div>
         <div className="text-3xl font-bold">{streak}</div>
         <div className="text-sm text-muted-foreground flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            {streak === 1 ? 'day' : 'days'} streak
         </div>
      </div>
   );
}
