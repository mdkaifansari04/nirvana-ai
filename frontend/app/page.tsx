
import Hero from '@/components/landing/hero';
import Feature from '@/components/landing/feature';
import Navbar from '@/components/landing/navbar';
import Cta from '@/components/landing/cta';
import Footer from '@/components/landing/footer';
import MentalWellness from '@/components/landing/journey';



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
