'use client';

import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function Home() {
   const { user } = useUser();
   const { signOut } = useClerk();
   const router = useRouter();

   return (
      <main className="mx-2">
         <Header />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
               <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Welcome, {user?.firstName || 'User'}!</CardTitle>
                  {user && (
                     <Button variant="destructive" onClick={() => signOut(() => router.push('/'))}>
                        Sign Out
                     </Button>
                  )}
               </CardHeader>

               <CardContent>THIS IS THE LANDING PAGE. PLEASE GO TO /DASHBOARD TO START USING THE APP.</CardContent>
            </Card>
         </div>
      </main>
   );
}
