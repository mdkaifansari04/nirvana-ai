'use client';

interface EmotionSelectorProps {
   selectedEmotion: string;
   onSelectEmotion: (emotion: string) => void;
}

export function EmotionSelector({ selectedEmotion, onSelectEmotion }: EmotionSelectorProps) {
   const emotions = [
      { name: 'Sad', emoji: '😔' },
      { name: 'Anxious', emoji: '😰' },
      { name: 'Tired', emoji: '😴' },
      { name: 'Neutral', emoji: '😐' },
      { name: 'Calm', emoji: '😌' },
      { name: 'Happy', emoji: '😊' },
      { name: 'Excited', emoji: '😁' },
      { name: 'Grateful', emoji: '🙏' },
   ];

   return (
      <div className="grid grid-cols-4 gap-2">
         {emotions.map((emotion) => (
            <button
               key={emotion.name}
               type="button"
               onClick={() => onSelectEmotion(emotion.name)}
               className={`p-3 rounded flex flex-col items-center justify-center transition-all
            ${selectedEmotion === emotion.name ? 'bg-primary text-primary-foreground font-medium' : 'bg-background border hover:border-primary'}`}
            >
               <span className="text-xl mb-1">{emotion.emoji}</span>
               <span className="text-sm">{emotion.name}</span>
            </button>
         ))}
      </div>
   );
}
