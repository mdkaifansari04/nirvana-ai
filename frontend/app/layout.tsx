import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import { APP_DESCRIPTION, APP_NAME } from '@/constants';
import { Providers } from './providers';

const urbanist = Urbanist({
   subsets: ['latin'],
   weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
   title: APP_NAME,
   description: APP_DESCRIPTION,
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <Providers>
            <body className={`${urbanist.className} scroll-smooth antialiased`}>
               <main>{children}</main>
            </body>
         </Providers>
      </html>
   );
}
