import Cta from '@/components/landing/cta';
import Feature from '@/components/landing/feature';
import Footer from '@/components/landing/footer';
import Hero from '@/components/landing/hero';
import MentalWellness from '@/components/landing/journey';
import Navbar from '@/components/landing/navbar';
import { BlurFade } from '@/components/ui/blur-fade';

export default function Home() {
   return (
      <section className="bg-[#F7F4F2] px-2 md:px-4 lg:px-8 max-w-[110rem] mx-auto">
         <BlurFade delay={0} inView>
            <Navbar />
         </BlurFade>
         <BlurFade delay={0.2} inView>
            <Hero />
         </BlurFade>
         <BlurFade delay={0.4} inView>
            <MentalWellness />
         </BlurFade>
         <BlurFade delay={0.6} inView>
            <Feature />
         </BlurFade>
         <BlurFade delay={0.8} inView>
            <Cta />
         </BlurFade>
         <BlurFade delay={1} inView>
            <Footer />
         </BlurFade>
      </section>
   );
}
