import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

export default function MentalWellness() {
   const features1 = ['Available anytime, anywhere', 'Personalized to your needs', 'Evidence-based approaches'];
   const features2 = ['Quick 3-15 minute exercises', 'Based on proven CBT techniques', 'Track your progress over time'];
   const features3 = ['Guided prompts for reflection', 'Track mood and emotional patterns', 'Private and secure entries'];

   return (
      <section className="text-foreground py-20 px-6 mx-auto">
         <div className="max-w-7xl mx-auto space-y-20">
            <div className="text-center">
               <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">Your journey to mental wellness</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mx-auto">
               <div className="p-6 space-y-6">
                  <div>
                     <h3 className="text-2xl font-semibold mb-2">Smart AI Chatbots</h3>
                     <p className="text-muted-foreground mb-4">Our AI chatbots provide 24/7 support using evidence-based techniques like CBT, ACT, and mindfulness practices.</p>
                     <ul className="space-y-2">
                        {features1.map((feature, index) => (
                           <li key={`feature1-${feature}`} className="flex items-center gap-2 text-sm">
                              <FaCheckCircle className="text-primary" />
                              <span>{feature}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
                  <Link href={'/dashboard/chat'}>
                     <Button variant="secondary">
                        Start Chatting
                        <ArrowRight className="h-4 w-4" />
                     </Button>
                  </Link>
               </div>

               <div className="p-6 rounded-xl shadow-md">
                  <h4 className="font-semibold mb-4">🧠 CBT Coach</h4>
                  <div className="space-y-4">
                     <div className="bg-secondary/10 px-4 py-3 rounded-lg w-fit">"I've been feeling anxious about my presentation tomorrow."</div>
                     <div className="bg-muted px-4 py-3 rounded-lg w-fit">
                        "That's understandable. Let's break down what's making you anxious and explore some techniques to help you feel more prepared."
                     </div>
                  </div>
               </div>

               <div className="p-6 rounded-xl shadow-md">
                  <h4 className="font-semibold mb-4">🧩 Thought Reframing</h4>
                  <div className="space-y-4">
                     <div>
                        <p className="text-sm font-medium mb-1">Negative Thought:</p>
                        <div className="bg-muted px-4 py-3 rounded-lg w-fit">"I'll never be good enough at my job."</div>
                     </div>
                     <div>
                        <p className="text-sm font-medium mb-1">Balanced Perspective:</p>
                        <div className="bg-secondary/10 px-4 py-3 rounded-lg w-fit">"I'm still learning and growing in my role. I've overcome challenges before and can continue to improve."</div>
                     </div>
                  </div>
               </div>

               <div className="p-6 space-y-6">
                  <div>
                     <h3 className="text-2xl font-semibold mb-2">CBT-based Micro Exercises</h3>
                     <p className="text-muted-foreground mb-4">Our micro-exercises help you identify cognitive distortions and develop healthier thinking habits in just minutes a day.</p>
                     <ul className="space-y-2">
                        {features2.map((feature) => (
                           <li key={`feature2-${feature}`} className="flex items-center gap-2 text-sm">
                              <FaCheckCircle className="text-primary" />
                              <span>{feature}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
                  <Link href={'/dashboard/exercise'}>
                     <Button variant="secondary">
                        Try Exercises
                        <ArrowRight className="h-4 w-4" />
                     </Button>
                  </Link>
               </div>
            </div>
         </div>

         <div className="grid md:grid-cols-2 gap-12 mt-20 items-start max-w-7xl mx-auto">
            <div className="p-6 space-y-6">
               <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Reflective Journals</h3>
                  <p className="text-lg mb-6 text-foreground/80">Our structured journaling prompts help you process emotions, identify patterns, and celebrate your progress over time.</p>
                  <ul className="space-y-2">
                     {features3.map((feature, index) => (
                        <li key={`feature2-${feature}`} className="flex items-center gap-2 text-sm">
                           <FaCheckCircle className="text-primary" />
                           <span>{feature}</span>
                        </li>
                     ))}
                  </ul>
               </div>
               <Link href="/dashboard/journal">
                  <Button variant="secondary">
                     Try Journaling
                     <ArrowRight className="h-4 w-4" />
                  </Button>
               </Link>
            </div>

            <div className="p-6 rounded-xl shadow-md">
               <div className="flex items-center p-3 border-b">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                     <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <span className="ml-3 font-medium">Today's Reflection</span>
               </div>
               <div className="p-3 space-y-4">
                  <div className="space-y-2">
                     <p className="font-medium text-sm">What went well today?</p>
                     <div className="bg-muted rounded-lg p-3">
                        <p className="text-sm">I had a productive meeting with my team and we made good progress on our project. I also took a short walk during lunch which helped clear my mind.</p>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <p className="font-medium text-sm">What challenged you today?</p>
                     <div className="bg-muted rounded-lg p-3">
                        <p className="text-sm">I felt overwhelmed with the number of tasks on my plate. Managing multiple deadlines was stressful, but I learned to prioritize better.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
