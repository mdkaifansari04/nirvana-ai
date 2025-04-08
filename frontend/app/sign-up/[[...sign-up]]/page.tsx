"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md">
        <SignUp
          path="/sign-up"
          signInUrl="/sign-in"
          afterSignUpUrl="/onboard"
          routing="path"
        />
      </div>
    </div>
  );
}