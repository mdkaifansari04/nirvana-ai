'use client';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Header() {
   const { user } = useUser();

   return (
      <header className="max-w-7xl mx-auto border rounded-full my-4 px-4 sm:px-6 lg:px-8 shadow-sm">
         <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
               <Link href="/" className="flex items-center">
                  <div className="rounded-lg p-1">
                     <Image src="/logo.svg" alt="Nirvana.AI Logo" width={32} height={32} className="h-8 w-8" />
                  </div>
                  <span className="ml-2 text-xl font-bold">Nirvana.AI</span>
               </Link>
            </div>

            <div className="flex items-center space-x-4">
               {user ? (
                  <Link href="/dashboard">
                     <Button>Dashboard</Button>
                  </Link>
               ) : (
                  <Link href="/sign-up">
                     <Button>Sign Up</Button>
                  </Link>
               )}
            </div>
         </div>
      </header>
   );
}
