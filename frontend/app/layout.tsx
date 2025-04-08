import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import { APP_DESCRIPTION, APP_NAME } from '@/constants';
import { ClerkProvider } from '@clerk/nextjs';

const urbanist = Urbanist({
   subsets: ['latin'],
   weight: ['200', '300', '400', '500', '600'],
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
         <ClerkProvider>
            <body className={`${urbanist.className} scroll-smooth antialiased`}>
               <Header />
               <main>{children}</main>
            </body>
         </ClerkProvider>
      </html>
   );
}
