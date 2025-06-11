// author: Khoa Phan <https://www.pldkhoa.dev>

'use client';

import { useState } from 'react';
import { ScrollDownText } from '@/components/data-display/scroll-down-text';
import { FadeImg } from '@/components/shared/fade-img';
import StackingCards, { StackingCardItem } from '@/components/ui/stacking-cards';
import { cn } from '@/lib/utils';
import { useWellnessCardStore } from '@/store/wellness-card';

const bgColors = ['bg-[#fef5c7]', 'bg-[#fbd0b5]', 'bg-[#e0c1f4]', 'bg-[#c3e8e4]', 'bg-[#c0e7b1]', 'bg-[#f4c2c2]'];

const randomImages = [
   'https://plus.unsplash.com/premium_vector-1739262161806-d954eb02427c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxxdGU5Smx2R3d0b3x8ZW58MHx8fHx8',
   'https://plus.unsplash.com/premium_vector-1738597190290-a3b571590b9e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHxxdGU5Smx2R3d0b3x8ZW58MHx8fHx8',
   'https://plus.unsplash.com/premium_vector-1738935247245-97940c74cced?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8cXRlOUpsdkd3dG98fGVufDB8fHx8fA%3D%3D',
   'https://plus.unsplash.com/premium_vector-1738935247692-1c2f2c924fd8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjJ8cXRlOUpsdkd3dG98fGVufDB8fHx8fA%3D%3D',
];

export default function StackingCardsDemo() {
   const [container, setContainer] = useState<HTMLElement | null>(null);
   const { wellnessCard } = useWellnessCardStore();
   return (
      <div className="h-[620px] overflow-auto text-white" ref={(node) => setContainer(node)}>
         <StackingCards totalCards={wellnessCard?.length || 0} scrollOptons={{ container: { current: container } }}>
            <div className="relative h-[620px] w-full z-10 text-2xl md:text-7xl font-bold uppercase flex justify-center items-center text-primary whitespace-pre">
               <ScrollDownText /> ↓
            </div>
            {wellnessCard?.map(({ quote, action, emoji, category }, index) => {
               return (
                  <StackingCardItem key={index} index={index} className="h-[620px]">
                     <div className={cn(bgColors[index % bgColors.length], 'h-[80%] sm:h-[70%] flex-col sm:flex-row aspect-video px-8 py-10 flex w-11/12 rounded-3xl mx-auto relative')}>
                        <div className="flex-1 flex flex-col justify-center">
                           <h3 className="font-bold text-2xl mb-5 text-primary">{quote}</h3>
                           <p className="text-secondary-foreground">{action}</p>
                        </div>

                        <div className="w-full sm:w-1/2 rounded-xl aspect-video relative overflow-hidden">
                           <FadeImg src={randomImages[index % randomImages.length]} alt={quote} className="object-cover w-full h-full" />
                        </div>
                     </div>
                  </StackingCardItem>
               );
            })}
         </StackingCards>
      </div>
   );
}
