import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Header() {
   return (
      <header className="max-w-7xl mx-auto border rounded-full my-4 px-4 sm:px-6 lg:px-8 shadow-sm">
         <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
               <Link href="/" className="flex items-center">
                  <div className="bg-white rounded-lg p-1">
                     <Image src="/logo.svg" alt="Nirvana.AI Logo" width={32} height={32} className="h-8 w-8" />
                  </div>
                  <span className="ml-2 text-xl font-bold">Nirvana.AI</span>
               </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
               <Link href="/dashboard">Dashboard</Link>
               <Link href="/dashboard/chat">Chat</Link>
               <Link href="/dashboard/journal">Journal</Link>
            </nav>

            <div className="flex items-center space-x-4">
               <Link href="/sign-up">
                  <Button>Sign Up</Button>
               </Link>
            </div>
         </div>
      </header>
   );
}