'use client';

import { Progress } from '@/components/ui/progress';
import { demoDashboard } from '@/lib/demo-dashboard-data';

export default function MoodScoreCard() {
   const { score, label, color } = demoDashboard.currentMood;

   const moodLevels = [
      { level: 'Low', threshold: 3, color: 'var(--destructive)' },
      { level: 'Neutral', threshold: 5, color: 'var(--muted-foreground)' },
      { level: 'Good', threshold: 7, color: 'var(--chart-2)' },
      { level: 'Excellent', threshold: 10, color: 'var(--chart-1)' },
   ];

   const activeMoodLevel = moodLevels.findIndex((level, index, arr) => score <= level.threshold && (index === 0 || score > arr[index - 1].threshold));

   return (
      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="text-5xl font-bold" style={{ color }}>
               {score}
            </div>
         </div>

         <div className="space-y-2">
            <Progress
               value={score * 10}
               max={100}
               className="h-2 w-full"
               style={
                  {
                     '--progress-background': `${color}20`,
                     '--progress-foreground': color,
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
