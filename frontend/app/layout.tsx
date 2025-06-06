import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/shared/toaster";
import { APP_DESCRIPTION, APP_NAME, CLERK_TEMPLATE_NAME } from "@/constants";
import { ClientProvider } from "@/provider/client-provider";
import { ClerkTokenProvider } from "@/provider/token-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${urbanist.className} scroll-smooth antialiased bg-[#F7F4F2]`}>
        <ClerkProvider>
          <ClientProvider>
            <ClerkTokenProvider templateName={CLERK_TEMPLATE_NAME}>
              <main>
                {children}
                <Toaster />
              </main>
              <Script
                defer
                data-domain="www.nirwana-ai.vercel.app"
                src="https://getanalyzr.vercel.app/tracking-script.js"
              />
            </ClerkTokenProvider>
          </ClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
