'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
   const { user, isLoaded } = useUser();
   const { signOut } = useClerk();
   const router = useRouter();

   useEffect(() => {
      if (isLoaded && !user) {
         router.push('/sign-in');
      }
   }, [isLoaded, user, router]);

   if (!isLoaded) return null;

   return (
      <div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
               <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Welcome, {user?.firstName || 'User'}!</CardTitle>
                  <Button variant="destructive" onClick={() => signOut(() => router.push('/'))}>
                     Sign Out
                  </Button>
               </CardHeader>

               <CardContent>THIS IS THE LANDING PAGE. PLEASE GO TO /DASHBOARD TO START USING THE APP.</CardContent>
            </Card>
         </div>
      </div>
   );
}
