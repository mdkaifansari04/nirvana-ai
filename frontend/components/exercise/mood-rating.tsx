'use client';

interface MoodRatingProps {
   value: number;
   onChange: (value: number) => void;
}

export function MoodRating({ value, onChange }: MoodRatingProps) {
   return (
      <div className="w-full">
         <div className="flex justify-between w-full mb-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
               <button
                  key={num}
                  type="button"
                  onClick={() => onChange(num)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
              ${value === num ? 'bg-primary text-primary-foreground font-medium' : 'bg-background border hover:border-primary'}`}
               >
                  {num}
               </button>
            ))}
         </div>
         <div className="flex justify-between text-xs text-muted-foreground px-1">
            <span>Poor</span>
            <span>Excellent</span>
         </div>
      </div>
   );
}
