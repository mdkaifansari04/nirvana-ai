'use client';

import { Progress } from '@/components/ui/progress';
import type { MicroExercise } from '@/data-access/response';
import { useEffect, useState } from 'react';

interface MoodScoreCardProps {
   microExercises: MicroExercise[];
}

export default function MoodScoreCard({ microExercises }: MoodScoreCardProps) {
   const [moodData, setMoodData] = useState({
      score: 0,
      label: 'No data',
      color: 'var(--muted-foreground)',
   });

   useEffect(() => {
      if (microExercises.length === 0) return;

      const recentExercises = [...microExercises].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

      const totalScore = recentExercises.reduce((acc, exercise) => acc + exercise.user_reflection.mood_rating_after, 0);

      const avgScore = Number.parseFloat((totalScore / recentExercises.length).toFixed(1));

      let label = 'Low';
      let color = 'var(--destructive)';

      if (avgScore > 7) {
         label = 'Excellent';
         color = 'hsl(var(--chart-1))';
      } else if (avgScore > 5) {
         label = 'Good';
         color = 'var(--chart-2)';
      } else if (avgScore > 3) {
         label = 'Neutral';
         color = 'var(--muted-foreground)';
      }

      setMoodData({
         score: avgScore,
         label,
         color,
      });
   }, [microExercises]);

   const moodLevels = [
      { level: 'Low', threshold: 3, color: 'var(--destructive)' },
      { level: 'Neutral', threshold: 5, color: 'var(--muted-foreground)' },
      { level: 'Good', threshold: 7, color: 'var(--chart-2)' },
      { level: 'Excellent', threshold: 10, color: 'var(--chart-1)' },
   ];

   const activeMoodLevel = moodLevels.findIndex((level, index, arr) => moodData.score <= level.threshold && (index === 0 || moodData.score > arr[index - 1].threshold));

   return (
      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">{moodData.label}</div>
            <div className="text-5xl font-bold" style={{ color: moodData.color }}>
               {moodData.score}
            </div>
         </div>

         <div className="space-y-2">
            <Progress
               value={moodData.score * 10}
               max={100}
               className="h-2 w-full"
               style={
                  {
                     '--progress-background': `${moodData.color}20`,
                     '--progress-foreground': moodData.color,
                  } as React.CSSProperties
               }
            />

            <div className="flex justify-between text-xs text-muted-foreground">
               {moodLevels.map((level, index) => (
                  <div key={level.level} className={`${index === activeMoodLevel ? 'font-medium' : ''}`} style={{ color: index === activeMoodLevel ? level.color : undefined }}>
                     {level.level}
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
