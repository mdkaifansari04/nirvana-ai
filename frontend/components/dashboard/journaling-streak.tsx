'use client';

import { demoDashboard } from '@/lib/demo-dashboard-data';
import { CalendarDays, Medal } from 'lucide-react';

export default function JournalingStreak() {
   const streak = demoDashboard.journalStreak;

   return (
      <div className="flex flex-col items-center justify-center text-center space-y-2">
         <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <Medal className="w-8 h-8 text-primary" />
         </div>
         <div className="text-3xl font-bold">{streak}</div>
         <div className="text-sm text-muted-foreground flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            {streak === 1 ? 'day' : 'days'} streak
         </div>
      </div>
   );
}
