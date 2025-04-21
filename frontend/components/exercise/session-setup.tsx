'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { EmotionSelector } from './emotion-selector';
import { MoodRating } from './mood-rating';

interface SessionSetupProps {
   onComplete: (data: {
      sessionGoal: string;
      moodRating: number;
      primaryEmotion: string;
   }) => void;
}

export function SessionSetup({ onComplete }: SessionSetupProps) {
   const [sessionGoal, setSessionGoal] = useState('');
   const [moodRating, setMoodRating] = useState(5);
   const [primaryEmotion, setPrimaryEmotion] = useState('');

   const isValid = sessionGoal.trim() !== '' && primaryEmotion !== '';

   const handleSubmit = () => {
      if (isValid) {
         onComplete({
            sessionGoal,
            moodRating,
            primaryEmotion,
         });
      }
   };

   return (
      <Card className="w-full">
         <CardHeader>
            <CardTitle className="text-xl font-medium text-foreground">Mental Health Assessment</CardTitle>
         </CardHeader>
         <CardContent className="space-y-6">
            <div>
               <h2 className="text-lg font-medium mb-3">What is your goal for today's exercise?</h2>
               <Input value={sessionGoal} onChange={(e) => setSessionGoal(e.target.value)} placeholder="e.g., Managing anxiety, Improving sleep, etc." className="w-full" />
            </div>

            <div>
               <h2 className="text-lg font-medium mb-3">What is your primary emotion right now?</h2>
               <EmotionSelector selectedEmotion={primaryEmotion} onSelectEmotion={setPrimaryEmotion} />
            </div>

            <div>
               <h2 className="text-lg font-medium mb-3">How would you rate your mental well-being?</h2>
               <MoodRating value={moodRating} onChange={setMoodRating} />
            </div>

            <div className="pt-4">
               <Button onClick={handleSubmit} disabled={!isValid} className="w-full">
                  Generate Exercise
                  <ChevronRight className="ml-1 h-4 w-4" />
               </Button>
            </div>
         </CardContent>
      </Card>
   );
}
