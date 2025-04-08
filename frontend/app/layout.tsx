import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { APP_DESCRIPTION, APP_NAME } from '@/constants';
import { ClerkProvider } from '@clerk/nextjs';

const poppins = Poppins({
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
            <body className={`${poppins.className} scroll-smooth antialiased`}>{children}</body>
         </ClerkProvider>
      </html>
   );
}