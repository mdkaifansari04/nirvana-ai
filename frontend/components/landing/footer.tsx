import { FaInstagram, FaFacebookF, FaYoutube, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';


const navLinks = [
   { label: 'Homepage', href: '/' },
   { label: 'Platform', href: '/platform' },
   { label: 'Assessment', href: '/assessment' },
   { label: 'About Us', href: '/about' },
   { label: 'Contact Us', href: '/contact' },
   { label: 'Blog', href: '/blog' },
];

const socialLinks = [
   { icon: <FaInstagram />, href: 'https://instagram.com' },
   { icon: <FaFacebookF />, href: 'https://facebook.com' },
   { icon: <FaYoutube />, href: 'https://youtube.com' },
   { icon: <FaTwitter />, href: 'https://twitter.com' },
];

export default function Footer() {
   return (
      <footer className="bg-amber-900 text-primary-foreground py-40 px-6 rounded-t-3xl mt-12">
         <div className="max-w-6xl mx-auto text-center">
            <div className="mb-10">
               <div className="flex justify-center items-center gap-3">
                    <Image src="/logo.svg" alt="Nirvana.AI Logo" width={32} height={32} className="h-8 w-8" />
                  <span className="text-white font-bold text-5xl">Nirvana.Ai</span>
               </div>
            </div>

            <nav className="flex justify-center flex-wrap gap-6 text-sm mb-10">
               {navLinks.map((link) => (
                  <a key={link.label} href={link.href} className="hover:text-foreground/70 transition-colors">
                     {link.label}
                  </a>
               ))}
            </nav>

            <div className="flex justify-center gap-4 mb-8 text-xl">
               {socialLinks.map((social, index) => (
                  <a
                     key={index}
                     href={social.href}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="hover:text-foreground/70 transition-colors"
                     aria-label={`Visit our ${social.href.split('.')[1]} page`}
                  >
                     {social.icon}
                  </a>
               ))}
            </div>

            <p className="text-s text-amber-100 mb-1">
               © COPYRIGHT {new Date().getFullYear()}, ALL RIGHTS RESERVED •{' '}
               <a href="#" className="underline hover:text-foreground/70">
                  TERMS & CONDITIONS
               </a>{' '}
               •{' '}
               <a href="#" className="underline hover:text-foreground/70">
                  PRIVACY POLICY
               </a>
            </p>

            <p className="text-s text-amber-100">Built by Xcoders</p>
         </div>
      </footer>
   );
}
