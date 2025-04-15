const Cta = () => {
   return (
      <section className="relative bg-white border border-amber-900 text-black px-6 py-20 rounded-[2.5rem] mt-10 mx-4 sm:mx-8 md:mx-16 shadow-lg overflow-hidden">
         <svg className="absolute -top-10 -right-10 w-64 h-64 text-black/10 rotate-12" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <title>Decorative background shape</title>
            <path
               fill="currentColor"
               d="M52.6,-60.6C66.3,-47.6,75.9,-31.2,75.5,-15.7C75.1,-0.2,64.6,14.5,54.6,29.8C44.7,45.2,35.3,61.1,21.5,67.7C7.7,74.2,-10.6,71.4,-24.6,62.4C-38.6,53.4,-48.4,38.1,-57.4,22.7C-66.5,7.3,-74.9,-8.1,-71.4,-20.6C-68,-33.1,-52.8,-42.7,-38.4,-55.2C-23.9,-67.7,-11.9,-83.1,1.8,-85.2C15.5,-87.4,30.9,-76.8,52.6,-60.6Z"
               transform="translate(100 100)"
            />
         </svg>

         <div className="relative z-10 max-w-6xl mx-auto text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Welcome to Our Company</h1>
            <p className="text-lg text-black/90 max-w-2xl mx-auto">We are dedicated to providing the best services to help you thrive.</p>
            <button type="button" className="bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-colors shadow">
               Get Started for Free
            </button>
            <p className="text-md text-black/80">Join us today and experience the difference!</p>
         </div>
      </section>
   );
};

export default Cta;
