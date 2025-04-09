'use client';

import Header from '@/components/header';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
   return (
      <div>
         <Header />
         <div className="flex items-center justify-center min-h-[calc(100vh-100px)] bg-gray-50">
            <div className="w-full max-w-md">
               <SignUp path="/sign-up" signInUrl="/sign-in" afterSignUpUrl="/onboard" routing="path" />
            </div>
         </div>
      </div>
   );
}
