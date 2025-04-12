'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NewExercisePage() {
   const router = useRouter();

   useEffect(() => {
      router.push('/dashboard/exercise/5');
   }, [router]);

   return (
      <div className="flex items-center justify-center min-h-screen">
         <p>Redirecting to new assessment...</p>
      </div>
   );
}

// TODO: BUILD THIS PAGE.
