'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useUser } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';

export default function DashboardLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const { user } = useUser();

   return (
      <SidebarProvider>
         <AppSidebar />
         <SidebarInset>
            <header className="flex h-16 shrink-0 items-center px-4 border-b border-border justify-between transition-[width,height] ease-linear">
               <div className="flex items-center gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <div className="text-xl md:text-2xl font-bold">Hello, {user?.firstName || 'User'}! 👋</div>
               </div>

               <UserButton afterSignOutUrl="/" />
            </header>
            <main>{children}</main>
         </SidebarInset>
      </SidebarProvider>
   );
}
