'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AIReport } from '@/types';

interface ReportCardProps {
   report: AIReport;
}

export function ReportCard({ report }: ReportCardProps) {
   return (
      <Card className="w-full">
         <CardHeader>
            <CardTitle className="text-xl font-medium text-foreground">Your Exercise Report</CardTitle>
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
               <p className="text-sm text-muted-foreground italic">
                  This report was generated based on your responses to help guide your mental wellness journey. Consider discussing these insights with a professional if needed.
               </p>
            </div>
         </CardContent>
      </Card>
   );
}
