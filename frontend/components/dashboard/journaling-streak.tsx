'use client';

import type { Journal } from '@/data-access/response';
import { isSameDay, subDays } from 'date-fns';
import { CalendarDays, Medal } from 'lucide-react';
import { useEffect, useState } from 'react';

interface JournalingStreakProps {
   journals: Journal[];
}

export default function JournalingStreak({ journals }: JournalingStreakProps) {
   const [streak, setStreak] = useState(0);

   useEffect(() => {
      const calculateStreak = () => {
         let currentStreak = 0;
         let currentDate = new Date();

         while (true) {
            const hasEntryOnDay = journals.some((journal) => isSameDay(new Date(journal.createdAt), currentDate));

            if (!hasEntryOnDay) break;

            currentStreak++;
            currentDate = subDays(currentDate, 1);
         }

         return currentStreak;
      };

      setStreak(calculateStreak());
   }, [journals]);

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
