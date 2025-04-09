import { BookOpen, Bot, LayoutDashboard } from 'lucide-react';

export const sidebarData = [
   {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
   },
   {
      title: 'Chat',
      url: '/dashboard/chat',
      icon: Bot,
   },
   {
      title: 'Journal',
      url: '/dashboard/journal',
      icon: BookOpen,
   },
];
