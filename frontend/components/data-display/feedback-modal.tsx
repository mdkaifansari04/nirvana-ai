import { ScratchToReveal } from '@/components/magicui/scratch-to-reveal';
import { Feedback } from '@/data-access/response';
import { X } from 'lucide-react';

export function FeedbackModal(props: { setShowFeedback: (show: boolean) => void, feedback: Feedback | null }) {
   return (
      <div className="relative">
         <ScratchToReveal
            width={300}
            height={300}
            minScratchPercentage={70}
            className="flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 bg-white p-4 shadow-xl z-20"
            gradientColors={['#EAD8C0', '#D7A98C', '#B9856F']}
         >
            <div className="flex flex-col items-center gap-2">
               <p className="text-6xl">{props.feedback?.emoji}</p>
               <p className="text-center text-lg font-medium text-gray-700">{props.feedback?.message}</p>
            </div>
         </ScratchToReveal>
         <div onClick={() => props.setShowFeedback(false)} className="absolute -top-1 -right-1 bg-slate-200 rounded-full p-1 cursor-pointer z-30">
            {' '}
            <X className="w-5 h-5" />
         </div>
      </div>
   );
}
