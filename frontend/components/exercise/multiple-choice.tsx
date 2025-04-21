'use client';

import { Check } from 'lucide-react';

interface MultipleChoiceProps {
   question: string;
   options: string[];
   selectedOptions: string[];
   onChange?: (selectedOptions: string[]) => void;
   readOnly?: boolean;
}

export function MultipleChoice({ question, options, selectedOptions, onChange, readOnly = false }: MultipleChoiceProps) {
   const toggleOption = (option: string) => {
      if (readOnly) return;

      const newSelection = selectedOptions.includes(option) ? selectedOptions.filter((item) => item !== option) : [...selectedOptions, option];

      onChange?.(newSelection);
   };

   return (
      <div className="mb-4 bg-muted/20 p-3 rounded-md border">
         <h3 className="font-medium text-base">{question}</h3>
         <hr className="my-4" />

         <div className="space-y-2">
            {options.map((option) => (
               <button
                  key={`option-${option}`}
                  onClick={() => toggleOption(option)}
                  disabled={readOnly}
                  aria-pressed={selectedOptions.includes(option)}
                  type="button"
                  className={`w-full text-left p-3 rounded border transition-all flex items-center
                     ${selectedOptions.includes(option) ? 'bg-primary/10 border-primary text-foreground font-medium' : 'bg-background border hover:border-primary'}
                     ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
               >
                  <span
                     className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center
                        ${selectedOptions.includes(option) ? 'bg-primary text-primary-foreground' : 'border'}`}
                  >
                     {selectedOptions.includes(option) && <Check className="w-3 h-3" />}
                  </span>
                  {option}
               </button>
            ))}
         </div>
      </div>
   );
}
