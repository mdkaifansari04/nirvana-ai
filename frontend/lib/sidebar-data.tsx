import { Activity, BarChart2, BookOpen, Bot, FilePlus, HeartHandshake, Home } from 'lucide-react';

export const sidebarData = [
   {
      title: 'Home',
      url: '/dashboard',
      icon: Home,
   },
   {
      title: 'Journal',
      url: '/dashboard/journal',
      icon: BookOpen,
      children: [
         {
            title: 'Your Journals',
            url: '/dashboard/journal',
            icon: BarChart2,
         },
         {
            title: 'Create New',
            url: '/dashboard/journal/create',
            icon: FilePlus,
         },
      ],
   },
   {
      title: 'Micro Exercises',
      url: '/dashboard/exercise',
      icon: Activity,
   },
   {
      title: 'Self Care Lab',
      url: '/dashboard/self-care',
      icon: HeartHandshake,
   },
   {
      title: 'Chat',
      url: '/dashboard/chat',
      icon: Bot,
   },
];
