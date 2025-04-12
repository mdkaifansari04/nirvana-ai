'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface MoodRatingProps {
   title: string;
   description?: string;
   initialRating?: number;
   onRatingChange: (rating: number) => void;
}

export function MoodRating({ title, description, initialRating = 5, onRatingChange }: MoodRatingProps) {
   const [rating, setRating] = useState(initialRating);

   const handleRatingChange = (newRating: number) => {
      setRating(newRating);
      onRatingChange(newRating);
   };

   const moods = [
      { label: '😣', value: 1, text: 'Very Bad' },
      { label: '😔', value: 2, text: 'Bad' },
      { label: '😐', value: 3, text: 'Not Good' },
      { label: '🙁', value: 4, text: 'A Bit Low' },
      { label: '😶', value: 5, text: 'Neutral' },
      { label: '🙂', value: 6, text: 'Okay' },
      { label: '😊', value: 7, text: 'Good' },
      { label: '😄', value: 8, text: 'Very Good' },
      { label: '😁', value: 9, text: 'Great' },
      { label: '🤩', value: 10, text: 'Excellent' },
   ];

   return (
      <Card className="w-full">
         <CardHeader>
            <CardTitle className="text-xl font-medium text-foreground">{title}</CardTitle>
            {description && <p className="text-muted-foreground mt-1">{description}</p>}
         </CardHeader>
         <CardContent>
            <div className="flex flex-col items-center space-y-4">
               <div className="flex justify-between w-full max-w-md">
                  {moods.map((mood) => (
                     <button
                        key={mood.value}
                        type="button"
                        onClick={() => handleRatingChange(mood.value)}
                        className={cn(
                           'rounded-full w-10 h-10 flex items-center justify-center transition-all text-xl',
                           rating === mood.value ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 transform scale-110' : 'bg-muted hover:bg-muted/80'
                        )}
                     >
                        {mood.label}
                     </button>
                  ))}
               </div>
               <div className="text-center">
                  <p className="text-xl font-medium">{moods.find((m) => m.value === rating)?.text}</p>
                  <p className="text-muted-foreground text-sm mt-1">Rating: {rating}/10</p>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
