"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <SignIn
          path="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/onboard"
          routing="path"
        />
      </div>
    </div>
  );
}