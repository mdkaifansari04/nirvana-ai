"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { BellIcon } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center px-4 border-b border-border justify-between transition-[width,height] ease-linear">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <div className="text-xl md:text-2xl font-bold">Hello, {user?.firstName || "User"}! 👋</div>
          </div>

          <div className="flex items-center gap-4">
            {/* <div className="relative">
                     <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                        <DropdownMenuTrigger asChild>
                           <Button variant="outline" size="icon">
                              <BellIcon className="h-5 w-5" />
                              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-80 mx-4">
                           <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                           <DropdownMenuSeparator />
                           <div className="max-h-80 overflow-y-auto">
                              <DropdownMenuItem>
                                 <div>
                                    <p className="text-sm font-medium">New message from your therapist</p>
                                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                                 </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                 <div>
                                    <p className="text-sm font-medium">Reminder: Complete your daily journal</p>
                                    <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                                 </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                 <div>
                                    <p className="text-sm font-medium">New micro-exercise available</p>
                                    <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                                 </div>
                              </DropdownMenuItem>
                           </div>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem className="text-primary font-medium" onClick={() => setSheetOpen(true)}>
                              View all notifications
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </div> */}

            <UserButton afterSignOutUrl="/" />
          </div>
        </header>
        <main>{children}</main>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>All Notifications</SheetTitle>
            </SheetHeader>
            <div className="m-4 mt-0 space-y-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm font-medium">New message from your therapist</p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm font-medium">Reminder: Complete your daily journal</p>
                <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm font-medium">New micro-exercise available</p>
                <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </SidebarInset>
    </SidebarProvider>
  );
}
