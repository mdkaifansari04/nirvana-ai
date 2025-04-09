'use client';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

export default function Header() {
   const navLinks = [
      { href: '/dashboard', label: 'Dashboard' },
      { href: '/dashboard/chat', label: 'Chat' },
      { href: '/dashboard/journal', label: 'Journal' },
   ];

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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
               {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
                     {link.label}
                  </Link>
               ))}
            </nav>

            <div className="flex items-center space-x-4">
               <Link href="/sign-up">
                  <Button>Sign Up</Button>
               </Link>

               {/* Mobile Navigation */}
               <div className="md:hidden">
                  <Sheet>
                     <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                           <Menu className="h-6 w-6" />
                           <span className="sr-only">Open menu</span>
                        </Button>
                     </SheetTrigger>
                     <SheetContent side="right">
                        <div className="flex flex-col gap-4 py-10">
                           {navLinks.map((link) => (
                              <Link key={link.href} href={link.href} className="px-4 py-2 hover:bg-accent rounded-md transition-colors">
                                 {link.label}
                              </Link>
                           ))}
                        </div>
                     </SheetContent>
                  </Sheet>
               </div>
            </div>
         </div>
      </header>
   );
}
