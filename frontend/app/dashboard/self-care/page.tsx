'use client';

import { useGetWellnessCard } from '@/hooks/mutation';
import { useToast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/lib/utils';
import { useWellnessCardStore } from '@/store/wellness-card';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SelfCareCardProps {
   feature: WellnessCard;
   index: number;
   handleClick: () => void;
}

interface WellnessCard {
   id: string;
   title: string;
   description: string;
   illustration: string;
   route: string;
   comingSoon: boolean;
}

const wellnessFeatures = [
   {
      id: 'daily-uplift',
      title: 'Daily Uplift',
      description: 'Start your day with personalized mood-boosting activities',
      illustration: '/assets/group-1.svg',
      route: '/dashboard/self-care/daily-uplift',
      comingSoon: false,
   },
   {
      id: 'relaxation-music',
      title: 'Relaxation Music Deck',
      description: 'Curated soundscapes to calm your mind and reduce stress',
      illustration: '/assets/frame-1.svg',
      route: '/dashboard/self-care/relaxation-music',
      comingSoon: false,
   },
   {
      id: 'mindful-breathing',
      title: 'Mindful Breathing',
      description: 'Guided breathing exercises for instant relaxation',
      illustration: '/assets/group-2.svg',
      route: '/dashboard/self-care/mindful-breathing',
      comingSoon: false,
   },
   {
      id: 'gratitude-journal',
      title: 'Gratitude Journal',
      description: 'Reflect on positive moments and build lasting happiness',
      illustration: '/assets/group-3.svg',
      route: '/dashboard/self-care/gratitude-journal',
      comingSoon: true,
   },
   {
      id: 'sleep-stories',
      title: 'Sleep Stories',
      description: 'Soothing bedtime stories for peaceful, restorative sleep',
      illustration: '/assets/frame.svg',
      route: '/dashboard/self-care/sleep-stories',
      comingSoon: true,
   },
];

export default function SelfCareLabDashboard() {
   const { mutateAsync: getWellnessCard } = useGetWellnessCard();
   const { setWellnessCard } = useWellnessCardStore();
   const { toast } = useToast();
   const router = useRouter();
   const handleGetWellnessCard = async () => {
      await getWellnessCard(undefined, {
         onSuccess: (data) => {
            setWellnessCard(data);
            router.push('/dashboard/self-care/daily-uplift');
         },
         onError: (error) => {
            toast({
               title: 'Error',
               description: getErrorMessage(error),
               variant: 'destructive',
            });
         },
      });
   };

   return (
      <div className="w-full min-h-screen overscroll-x-hidden bg-slate-50">
         {/* Animated Background Elements */}
         <div className="overflow-hidden fixed inset-0 pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br rounded-full blur-3xl animate-pulse from-blue-200/20 to-purple-200/20"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br rounded-full blur-3xl delay-1000 animate-pulse from-green-200/20 to-blue-200/20"></div>
         </div>

         <div className="container relative z-10 px-4 py-12 mx-auto">
            {/* Header Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16 text-center">
               <h1 className="mb-6 text-5xl font-semibold text-transparent bg-clip-text md:text-6xl bg-primary">Welcome to Your Self-Care Lab 🧪</h1>
               <p className="mx-auto max-w-2xl text-xl tracking-tight leading-relaxed text-secondary-foreground">Explore tools to boost your mood, relax your mind, and grow mentally stronger.</p>
            </motion.div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-3">
               <SelfCareCard feature={wellnessFeatures[0]} index={0} handleClick={handleGetWellnessCard} />
               <SelfCareCard feature={wellnessFeatures[1]} index={1} handleClick={() => router.push('/dashboard/self-care/music-deck')} />
               <SelfCareCard feature={wellnessFeatures[2]} index={2} handleClick={() => router.push('/dashboard/self-care/mindful-breathing')} />
               <SelfCareCard feature={wellnessFeatures[3]} index={3} handleClick={handleGetWellnessCard} />
               <SelfCareCard feature={wellnessFeatures[4]} index={4} handleClick={handleGetWellnessCard} />
            </div>
         </div>
      </div>
   );
}

const SelfCareCard = (props: SelfCareCardProps) => {
   const { feature, index, handleClick } = props;
   const [isLoading, setIsLoading] = useState(false);
   return (
      <motion.div key={feature.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
         <div
            onClick={(e) => {
               setIsLoading(true);
               e.preventDefault();
               handleClick();
            }}
            className={`${feature.comingSoon ? 'pointer-events-none' : ''}`}
         >
            <motion.div
               className={`group relative bg-white rounded-3xl p-8 transition-all duration-300 cursor-pointer border backdrop-blur-sm h-full  ${feature.comingSoon ? 'cursor-not-allowed' : ''}`}
            >
               {/* Illustration */}
               <div className={`flex justify-center mb-6 ${feature.comingSoon ? 'opacity-50' : ''}`}>
                  <div className="relative w-24 h-24 transition-transform duration-300 group-hover:scale-110">
                     <Image src={feature.illustration || '/placeholder.svg'} alt={feature.title} fill className="object-contain" />
                  </div>
               </div>

               {feature.comingSoon && (
                  <div className="flex absolute top-1/2 left-1/2 justify-between items-center -translate-x-1/2 -translate-y-1/2">
                     <div className="flex gap-2 items-center px-4 py-2 text-white rounded-full bg-primary">
                        <p className="text-sm text-white">Coming Soon</p>
                     </div>
                  </div>
               )}
               {/* Content */}
               <div className={`text-center space-y-2 ${feature.comingSoon ? 'opacity-50' : ''}`}>
                  <h3 className="text-2xl font-bold text-gray-800 transition-colors group-hover:text-gray-900">{feature.title}</h3>
                  <p className="text-sm leading-5 text-gray-600">{feature.description}</p>
               </div>

               {/* Hover Arrow */}
               {!isLoading && (
                  <motion.div className="absolute right-6 bottom-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100" whileHover={{ x: 4 }}>
                     <ArrowRight className="w-6 h-6 text-gray-700" />
                  </motion.div>
               )}

               {isLoading && (
                  <motion.div className="absolute right-6 bottom-6">
                     <Loader2 className="w-6 h-6 text-gray-700 animate-spin" />
                  </motion.div>
               )}

               {/* Subtle shine effect */}
               <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent rounded-3xl opacity-0 transition-opacity duration-500 transform -skew-x-12 via-white/10 group-hover:opacity-100"></div>
            </motion.div>
         </div>
      </motion.div>
   );
};
