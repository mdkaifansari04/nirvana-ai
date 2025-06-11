'use client';

import { cn } from '@/lib/utils';
import type { SidebarItem } from '@/types';
import type { LucideIcon } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

interface SidebarElementsProps {
   items: SidebarItem[];
   iconClassNames: string;
}

export function SidebarElements({ items, iconClassNames }: SidebarElementsProps) {
   const pathname = usePathname();
   const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

   const toggleItem = (title: string) => {
      setOpenItems((prev) => ({
         ...prev,
         [title]: !prev[title],
      }));
   };

   return (
      <div className="flex flex-1 flex-col gap-6">
         {items.map((item) => {
            const isItemActive = pathname.includes(item.url) && item.url !== '/dashboard';
            const isRootActive = pathname === item.url;
            const isActive = item.url === '/dashboard' ? isRootActive : isItemActive;
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openItems[item.title] || isItemActive;

            return (
               <div key={item.title} className="flex flex-col">
                  <div
                     className={cn(
                        'border border-border/20 flex cursor-pointer items-center gap-2 rounded-xl px-3 group-data-[collapsible=icon]:py-3.5 group-data-[collapsible=icon]:px-2 py-2 text-sm transition-all text-background/50 hover:text-background',
                        isActive && 'bg-accent text-foreground hover:text-foreground/50'
                     )}
                     onClick={() => (hasChildren ? toggleItem(item.title) : null)}
                     onKeyDown={(e) => {
                        if (hasChildren && (e.key === 'Enter' || e.key === ' ')) {
                           e.preventDefault();
                           toggleItem(item.title);
                        }
                     }}
                     tabIndex={hasChildren ? 0 : -1}
                     role={hasChildren ? 'button' : undefined}
                     aria-expanded={hasChildren ? isOpen : undefined}
                  >
                     {hasChildren ? (
                        <>
                           <item.icon className={cn('h-4 w-4', iconClassNames)} />
                           <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                           <ChevronDown className={cn('ml-auto h-4 w-4 transition-transform duration-200', isOpen ? 'rotate-180' : '')} />
                        </>
                     ) : (
                        <Link href={item.url} className="flex items-center gap-2 w-full">
                           <item.icon className={cn('h-4 w-4 group-data-[collapsible=icon]:mx-auto', iconClassNames)} />
                           <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                        </Link>
                     )}
                  </div>

                  {hasChildren && isOpen && (
                     <div className="pl-6 group-data-[collapsible=icon]:mx-auto mt-2 flex flex-col gap-2">
                        {item.children?.map((child) => {
                           const isChildActive = pathname === child.url;

                           return (
                              <Link
                                 key={child.title}
                                 href={child.url}
                                 className={cn(
                                    'border border-border/20 flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-all hover:text-white',
                                    isChildActive && 'bg-accent text-foreground hover:text-foreground/50'
                                 )}
                              >
                                 <child.icon className={cn('h-4 w-4', iconClassNames)} />
                                 <span className="group-data-[collapsible=icon]:hidden">{child.title}</span>
                              </Link>
                           );
                        })}
                     </div>
                  )}
               </div>
            );
         })}
      </div>
   );
}
