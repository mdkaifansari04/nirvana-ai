'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { sidebarData } from '@/lib/sidebar-data';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const pathname = usePathname();
   const currentPage = sidebarData.find((item) => item.url === pathname);

   return (
      <SidebarProvider>
         <AppSidebar />
         <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
               <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <h1 className="text-lg font-semibold">{currentPage?.title}</h1>
               </div>
            </header>
            <main className="px-6">{children}</main>
         </SidebarInset>
      </SidebarProvider>
   );
}
