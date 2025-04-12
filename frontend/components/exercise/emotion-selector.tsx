'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface EmotionSelectorProps {
   title: string;
   description?: string;
   initialEmotion?: string;
   onEmotionChange: (emotion: string) => void;
}

export function EmotionSelector({ title, description, initialEmotion = '', onEmotionChange }: EmotionSelectorProps) {
   const [selectedEmotion, setSelectedEmotion] = useState(initialEmotion);

   const emotions = [
      { label: 'Happy', emoji: '😊' },
      { label: 'Sad', emoji: '😔' },
      { label: 'Angry', emoji: '😠' },
      { label: 'Anxious', emoji: '😰' },
      { label: 'Tired', emoji: '😫' },
      { label: 'Calm', emoji: '😌' },
      { label: 'Frustrated', emoji: '😤' },
      { label: 'Excited', emoji: '😃' },
      { label: 'Bored', emoji: '😒' },
      { label: 'Grateful', emoji: '🙏' },
      { label: 'Overwhelmed', emoji: '😩' },
      { label: 'Insecure', emoji: '😟' },
   ];

   const handleEmotionSelect = (emotion: string) => {
      setSelectedEmotion(emotion);
      onEmotionChange(emotion);
   };

   return (
      <Card className="w-full">
         <CardHeader>
            <CardTitle className="text-xl font-medium text-foreground">{title}</CardTitle>
            {description && <p className="text-muted-foreground mt-1">{description}</p>}
         </CardHeader>
         <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
               {emotions.map((emotion) => (
                  <button
                     key={emotion.label}
                     type="button"
                     onClick={() => handleEmotionSelect(emotion.label)}
                     className={cn(
                        'flex flex-col items-center justify-center py-3 px-2 rounded-lg border transition-all',
                        selectedEmotion === emotion.label ? 'bg-primary/10 border-primary text-primary' : 'bg-background border-border hover:border-primary/50'
                     )}
                  >
                     <span className="text-2xl mb-1">{emotion.emoji}</span>
                     <span className="font-medium">{emotion.label}</span>
                  </button>
               ))}
            </div>
         </CardContent>
      </Card>
   );
}
