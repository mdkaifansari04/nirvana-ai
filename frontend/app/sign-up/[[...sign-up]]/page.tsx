'use client';

import Header from '@/components/header';
import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';

export default function SignUpPage() {
   return (
      <div className="mx-2">
         <Header />
         <div className="flex min-h-[calc(100vh-100px)] max-w-7xl mx-auto border rounded-xl p-2">
            <div className="w-full lg:w-1/2 flex items-center justify-center">
               <div className="w-full max-w-md">
                  <SignUp path="/sign-up" signInUrl="/sign-in" afterSignUpUrl="/onboard" routing="path" />
               </div>
            </div>
            <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-[#673b26] p-8 rounded-lg">
               <div className="flex flex-col items-center space-y-6">
                  <Image src="/logo.svg" alt="Nirvana.AI Logo" width={120} height={120} />
                  <h1 className="text-4xl font-bold text-accent">Sign up to Nirvana.AI</h1>
               </div>
            </div>
         </div>
      </div>
   );
}
