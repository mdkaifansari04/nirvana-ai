import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { APP_DESCRIPTION, APP_NAME, CLERK_TEMPLATE_NAME } from "@/constants";
import { ClientProvider } from "@/provider/client-provider";
import { ClerkTokenProvider } from "@/provider/token-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/shared/toaster";

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
    <html lang="en">
      <ClerkProvider>
        <ClientProvider>
          <ClerkTokenProvider templateName={CLERK_TEMPLATE_NAME}>
            <body className={`${urbanist.className} scroll-smooth antialiased`}>
              <main>
                {children}
                <Toaster />
              </main>
            </body>
          </ClerkTokenProvider>
        </ClientProvider>
      </ClerkProvider>
    </html>
  );
}
