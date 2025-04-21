'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AIReport } from '@/types';
import { ArrowUp, ChevronRight } from 'lucide-react';

interface ExerciseReportProps {
   report: AIReport;
   initialMood: number;
   finalMood: number;
   onComplete: () => void;
}

export function ExerciseReport({ report, initialMood, finalMood, onComplete }: ExerciseReportProps) {
   const moodImprovement = finalMood - initialMood;

   return (
      <Card className="w-full">
         <CardHeader>
            <CardTitle className="text-xl font-medium text-foreground">Your Exercise Report</CardTitle>
            {moodImprovement > 0 && (
               <div className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  Mood improved by {moodImprovement} points
               </div>
            )}
         </CardHeader>
         <CardContent className="space-y-6">
            <div>
               <h3 className="text-lg font-medium mb-2">Summary & Review</h3>
               <p className="text-muted-foreground">{report.review}</p>
            </div>

            <div>
               <h3 className="text-lg font-medium mb-2">Feedback & Recommendations</h3>
               <p className="text-muted-foreground">{report.feedback}</p>
            </div>

            <div className="pt-4 border-t border-border">
               <p className="text-sm text-muted-foreground italic mb-4">
                  This report was generated based on your responses to help guide your mental wellness journey. Consider discussing these insights with a professional if needed.
               </p>

               <Button onClick={onComplete} className="w-full">
                  Complete & Save Exercise
                  <ChevronRight className="ml-1 h-4 w-4" />
               </Button>
            </div>
         </CardContent>
      </Card>
   );
}
