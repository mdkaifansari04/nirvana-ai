import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
   { label: 'Home', href: '/' },
   { label: 'Dashboard', href: '/dashboard' },
   { label: 'Journal', href: '/dashboard/journal' },
   { label: 'Micro Exercises', href: '/dashboard/exercises' },
   { label: 'Chat', href: '/dashboard/chat' },
];

export default function Footer() {
   return (
      <footer className="bg-primary text-primary-foreground py-20 px-6 rounded-3xl mt-16 mb-6">
         <div className="max-w-6xl mx-auto text-center">
            <div className="mb-10">
               <div className="flex justify-center items-center gap-3">
                  <Image src="/logo.svg" alt="Nirvana.AI Logo" width={32} height={32} className="h-10 w-10" />
                  <span className="text-white font-bold text-5xl">Nirvana.AI</span>
               </div>
            </div>

            <nav className="flex justify-center flex-wrap gap-6 text-sm mb-10">
               {navLinks.map((link) => (
                  <Link key={link.label} href={link.href} className="hover:text-secondary transition-colors">
                     {link.label}
                  </Link>
               ))}
            </nav>

            <p className="text-s text-secondary mb-1">
               © COPYRIGHT {new Date().getFullYear()}. ALL RIGHTS RESERVED •{' '}
            </p>

            <p className="text-s text-secondary">Built by Xcoders</p>
         </div>
      </footer>
   );
}