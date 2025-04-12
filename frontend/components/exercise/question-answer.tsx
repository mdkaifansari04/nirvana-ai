'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface QuestionAnswerProps {
   question: string;
   initialAnswer?: string;
   onAnswerChange: (answer: string) => void;
}

export function QuestionAnswer({ question, initialAnswer = '', onAnswerChange }: QuestionAnswerProps) {
   const [answer, setAnswer] = useState(initialAnswer);

   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newAnswer = e.target.value;
      setAnswer(newAnswer);
      onAnswerChange(newAnswer);
   };

   return (
      <Card className="w-full">
         <CardHeader>
            <CardTitle className="text-xl font-medium text-foreground">{question}</CardTitle>
         </CardHeader>
         <CardContent>
            <Textarea placeholder="Type your answer here..." className="min-h-[120px] text-base" value={answer} onChange={handleChange} />
         </CardContent>
      </Card>
   );
}
