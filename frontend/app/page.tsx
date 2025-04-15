import Cta from '@/components/landing/cta';
import Feature from '@/components/landing/feature';
import Footer from '@/components/landing/footer';
import Hero from '@/components/landing/hero';
import MentalWellness from '@/components/landing/journey';
import Navbar from '@/components/landing/navbar';

export default function Home() {
   return (
      <>
         <Navbar />
         <Hero />
         <MentalWellness />
         <Feature />
         <Cta />
         <Footer />
      </>
   );
}
