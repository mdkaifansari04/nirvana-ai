'use client';

import Header from '@/components/header';
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
   return (
      <div>
         <Header />
         <div className="flex items-center justify-center min-h-[calc(100vh-100px)] bg-gray-50">
            <div className="w-full max-w-md">
               <SignIn path="/sign-in" signUpUrl="/sign-up" afterSignInUrl="/onboard" routing="path" />
            </div>
         </div>
      </div>
   );
}
