import Image from 'next/image';
import Link from 'next/link';
import type * as React from 'react';

import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu } from '@/components/ui/sidebar';
import { sidebarData } from '@/lib/sidebar-data';
import { SidebarElements } from './sidebar-elements';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   return (
      <div className="relative">
         <Sidebar collapsible="icon" variant="inset" {...props}>
            <SidebarHeader className="mx-auto">
               <Link href="/" className="flex items-center gap-2">
                  <Image src="/logo.svg" alt="Logo" width={36} height={36} />
                  <span className="text-xl font-semibold group-data-[collapsible=icon]:hidden text-accent">Nirvana AI</span>
               </Link>
            </SidebarHeader>
            <SidebarContent className="group-data-[collapsible=icon]:mx-auto">
               <SidebarGroup className="my-auto">
                  <SidebarMenu>
                     <SidebarElements items={sidebarData} iconClassNames="group-data-[collapsible=icon]:size-6 stroke-[1.5]" />
                  </SidebarMenu>
               </SidebarGroup>
            </SidebarContent>
         </Sidebar>
      </div>
   );
}
