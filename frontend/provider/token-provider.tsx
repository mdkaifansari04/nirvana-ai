// ClerkTokenProvider.tsx
"use client";
import { accessTokenStorage } from "@/utils/token-storage";
import { useClerk } from "@clerk/nextjs";
import { useEffect } from "react";

type ClerkTokenProviderProps = {
  children: React.ReactNode;
  templateName: string;
};

export const ClerkTokenProvider = ({ children, templateName }: ClerkTokenProviderProps) => {
  const { isSignedIn } = useClerk();

  useEffect(() => {
    const fetchToken = async () => {
      if (window.Clerk?.session) {
        try {
          const fetchedToken = await window.Clerk.session.getToken({ template: templateName });
          accessTokenStorage.set(fetchedToken);
        } catch (err) {
          console.error("Failed to fetch Clerk token:", err);
        }
      }
    };

    fetchToken();
  }, [templateName, isSignedIn]);

  return <>{children}</>;
};
