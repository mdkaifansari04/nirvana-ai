import Image from 'next/image';
import frameImg from '@/assets/Frame (1).png';

const Hero = () => {
   return (
      <section className="bg-[#F5F3F1] py-20 px-6">
         <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-center mx-auto">
               <span className="text-sm font-semibold uppercase tracking-wide text-gray-700">Our Mission</span>

               <h1 className="text-5xl md:text-6xl font-bold my-6 leading-snug text-[#3B2D26]">
                  Empathic <br /> Mental Health <br />
                  <span className="text-[#A6563E]">AI Companion</span>
               </h1>

               <p className="text-lg md:text-2xl text-gray-600 mb-8 max-w-xl mx-auto md:mx-0">Step into a world of cutting-edge technology and compassionate care, tailored to your unique needs.</p>

               <div className="flex flex-col sm:flex-row gap-4 justify-center  mx-auto ">
                  <button className="bg-[#3B2D26] text-white px-6 py-3 rounded-full">Try Demo</button>
                  <button className="border border-[#3B2D26] text-[#3B2D26] px-6 py-3 rounded-full">Get Started</button>
               </div>
            </div>
            {/* <div className="md:w-1/2 flex justify-center mb-10 md:mb-0">
          <Image
            src={frameImg}
            alt="App Mockups"
            className="w-full h-auto max-w-xl"
            priority
            quality={90}
          />
        </div> */}
         </div>
      </section>
   );
};

export default Hero;
