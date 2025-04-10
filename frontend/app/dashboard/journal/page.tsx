import { Button } from '@/components/ui/button';
import { FilePlus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function JournalPage() {
   return (
      <div className="container py-6 mx-auto">
         <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Journal Analytics</h1>
            <Link href="/dashboard/journal/create">
               <Button>
                  <FilePlus className="w-4 h-4 mr-2" />
                  Create New Entry
               </Button>
            </Link>
         </div>
         <div className="grid gap-4">
            <div className="p-6 border rounded-lg">
               <p className="text-muted-foreground">Journal analytics will appear here</p>
            </div>
         </div>
      </div>
   );
}
