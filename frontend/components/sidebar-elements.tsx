'use client';

import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

export function SidebarElements({
   items,
}: {
   items: {
      title: string;
      url: string;
      icon?: LucideIcon;
   }[];
}) {
   const pathname = usePathname();

   return (
      <SidebarGroup>
         <SidebarMenu>
            {items.map((item) => (
               <Collapsible key={item.title} asChild defaultOpen={pathname === item.url} className="group/collapsible">
                  <SidebarMenuItem>
                     <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title} isActive={pathname === item.url} asChild size="lg" className="flex justify-center items-center w-full [&>svg]:size-5">
                           <Link href={item.url} className="flex justify-center items-center w-full">
                              {item.icon && <item.icon />}
                              <span className="group-data-[collapsible=icon]:hidden ml-2 text-base">{item.title}</span>
                           </Link>
                        </SidebarMenuButton>
                     </CollapsibleTrigger>
                  </SidebarMenuItem>
               </Collapsible>
            ))}
         </SidebarMenu>
      </SidebarGroup>
   );
}
