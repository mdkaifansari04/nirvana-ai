'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface MultipleChoiceProps {
   question: string;
   options: string[];
   initialSelectedOptions?: string[];
   onSelectChange: (selected: string[]) => void;
   multiSelect?: boolean;
}

export function MultipleChoice({ question, options, initialSelectedOptions = [], onSelectChange, multiSelect = true }: MultipleChoiceProps) {
   const [selectedOptions, setSelectedOptions] = useState<string[]>(initialSelectedOptions);

   const toggleOption = (option: string) => {
      let newSelected: string[];

      if (multiSelect) {
         // For multi-select questions
         if (selectedOptions.includes(option)) {
            newSelected = selectedOptions.filter((item) => item !== option);
         } else {
            newSelected = [...selectedOptions, option];
         }
      } else {
         // For single-select questions
         newSelected = [option];
      }

      setSelectedOptions(newSelected);
      onSelectChange(newSelected);
   };

   return (
      <Card className="w-full">
         <CardHeader>
            <CardTitle className="text-xl font-medium text-foreground">{question}</CardTitle>
         </CardHeader>
         <CardContent className="space-y-3">
            {options.map((option) => (
               <button
                  key={`option-${option}`}
                  type="button"
                  className={cn(
                     'w-full text-left px-4 py-3 rounded-lg border transition-all',
                     selectedOptions.includes(option) ? 'bg-primary/10 border-primary text-primary font-medium' : 'bg-background border-border hover:border-primary/50'
                  )}
                  onClick={() => toggleOption(option)}
               >
                  {option}
               </button>
            ))}
         </CardContent>
      </Card>
   );
}
