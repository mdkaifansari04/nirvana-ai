import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative pt-16 pb-8 md:py-24">
      <div className="container mx-auto text-center flex flex-col items-center justify-center">
        <h1 className="max-w-4xl mx-auto text-4xl md:text-6xl lg:text-7xl font-bold leading-20 text-primary">
          <div className="w-fit mx-auto mb-3">
            <a className="text-center" href="https://www.producthunt.com/products/nirvana-ai-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-nirvana&#0045;ai&#0045;2" target="_blank">
              <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=995366&theme=light&t=1753117742720" alt="Nirvana&#0032;AI - Feel&#0032;Better&#0046;&#0032;Live&#0032;Brighter&#0046;&#0032;Start&#0032;with&#0032;Nirvana&#0046; | Product Hunt" width="250" height="54" />
            </a>
          </div>
          <p className="font-normal">
            Your <span className="italic">journey</span> to
          </p>
          <p className="font-bold">mental wellness</p>
          <p className="font-normal">
            starts <span className="italic font-bold">here</span>
          </p>
        </h1>

        <p className="max-w-2xl mx-auto mt-6 text-xl text-muted-foreground">Step into a world of cutting-edge technology and compassionate care, tailored to your unique needs.</p>

        <Link href="/sign-up" className="w-56 sm:w-64 md:w-72 mt-10 mx-auto inline-flex items-center justify-center px-8 py-3 text-base md:text-lg font-medium transition-all duration-300 bg-foreground text-background rounded-full hover:bg-foreground/90 hover:scale-105 hover:shadow-lg gap-3 group">
          Get Started
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>

        {/* <div className="relative mt-16">
               <MockupFrame>
                  <Mockup type="responsive">
                     <Image src="/hero.png" alt="Nirvana AI Interface" width={5000} height={5000} className="w-full h-full" priority />
                  </Mockup>
               </MockupFrame>
               <div className="rounded-b-lg absolute bottom-0 left-0 right-0 w-full h-[100px] md:h-[200px] lg:h-[300px] bg-gradient-to-t from-secondary/80 to-transparent z-10" />
            </div> */}
      </div>
    </section>
  );
};

export default Hero;
