import FeatureCard from './feature-card';
// import Image from 'next/image';

const features = [
   {
      title: 'Emotional Support',
      description: 'Receive empathetic and compassionate guidance tailored to your unique mental health needs.',
      icon: '/features-icons/emotional-support.svg',
   },
   {
      title: 'Personalized Insights',
      description: 'Gain deep insights into your thoughts, emotions, and behaviors with our AI-powered analysis.',
      icon: '/features-icons/personalized-insights.svg',
   },
   {
      title: 'Self-Discovery',
      description: 'Unlock a deeper understanding of yourself through reflective exercises.',
      icon: '/features-icons/self-discovery.svg',
   },
   {
      title: 'Cognitive Enhancement',
      description: 'Improve mental performance with targeted cognitive strategies.',
      icon: '/features-icons/cognitive-enhancement.svg',
   },
   {
      title: '24/7 Accessibility',
      description: 'Access support anytime, anywhere—your well-being on your schedule.',
      icon: '/features-icons/accessibility.svg', // ✅ Direct path, no import
   },
   {
      title: 'Confidential and Secure',
      description: 'We prioritize your privacy and data security every step of the way.',
      icon: '/features-icons/security.svg',
   },
];

const Features = () => {
   return (
      <section className="bg-[#A5B26E] px-4 py-20 rounded-[40px] mt-10 m-4 sm:m-8 md:m-16">
         <div className="max-w-6xl mx-auto text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
               <div>
                  <p className="text-sm font-semibold bg-white/20 text-white px-4 py-1 rounded-full inline-block mb-2">Our Core Features</p>
                  <h2 className="text-4xl font-bold">Nirvana.Ai App Features</h2>
               </div>
               <p className="text-sm font-bold uppercase tracking-wide mt-4 md:mt-0">{features.length} Total</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {features.map((feature) => (
                  <FeatureCard key={feature.title} title={feature.title} description={feature.description} icon={feature.icon} />
               ))}
            </div>
         </div>
      </section>
   );
};

export default Features;
