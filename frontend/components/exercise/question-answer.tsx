'use client';

import { Textarea } from '@/components/ui/textarea';

interface QuestionAnswerProps {
   question: string;
   answer: string;
   onChange?: (value: string) => void;
   readOnly?: boolean;
}

export function QuestionAnswer({ question, answer, onChange, readOnly = false }: QuestionAnswerProps) {
   return (
      <div className="mb-4 bg-muted/20 p-3 rounded-md border">
         <h3 className="font-medium text-base">{question}</h3>
         <hr className="my-4" />

         {readOnly ? (
            <p className="mt-1 text-sm">{answer}</p>
         ) : (
            <Textarea value={answer} onChange={(e) => onChange?.(e.target.value)} placeholder="Type your answer here..." className="w-full min-h-[120px]" />
         )}
      </div>
   );
}
