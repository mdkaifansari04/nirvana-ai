import Image from 'next/image';

interface FeatureCardProps {
   title: string;
   description: string;
   icon: string;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
   return (
      <div className="bg-white rounded-[30px] p-6 text-black shadow-md flex flex-col justify-between h-full transition-transform hover:-translate-y-1 hover:shadow-lg duration-200">
         <div>
            <Image src={icon} alt={title} width={56} height={56} className="mb-4 w-14 h-14" />
            <h3 className="font-semibold text-lg sm:text-xl">{title}</h3>
            <p className="text-sm sm:text-base mt-2 text-gray-700">{description}</p>
         </div>
      </div>
   );
};

export default FeatureCard;