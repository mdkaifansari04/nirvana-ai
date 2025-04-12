import type { LucideIcon } from 'lucide-react';

export interface SidebarItem {
   title: string;
   url: string;
   icon: LucideIcon;
   children?: SidebarItem[];
}

export interface Topic {
   id: string;
   title: string;
   icon: string;
   count?: number;
}

export interface ChatMessage {
   id: string;
   content: string;
   sender: 'user' | 'assistant';
   avatar?: string;
}

export interface TopicChat {
   id: string;
   messages: ChatMessage[];
}

export interface JournalEntry {
   id: string;
   userClerkId: string;
   title: string;
   content: string;
   createdAt: string;
   updatedAt: string;
}

export interface ActivityDay {
   date: string;
   count: number;
   level: 0 | 1; // 0 = no entries, 1 = has entries
}

export interface MonthData {
   month: string;
   year: string;
   entries: number;
}

export interface AverageLengthData {
   month: string;
   year: string;
   average: number;
}

export interface WordCountData {
   month: string;
   year: string;
   totalWords: number;
}

export interface JournalEntryWithWordCount extends JournalEntry {
   wordCount: number;
}