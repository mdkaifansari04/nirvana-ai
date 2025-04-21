import type { Journal } from '@/data-access/response';
import type { ActivityDay, JournalEntryWithWordCount, MonthData, WordCountData } from '@/types';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import { stripHtml } from './utils';

const today = new Date();
const sixMonthsAgo = subDays(today, 180);

const createDate = (month: number, day: number) => {
   const date = new Date();
   date.setMonth(month);
   date.setDate(day);
   return date;
};

const getWordCount = (htmlContent: string): number => {
   const plainText = stripHtml(htmlContent);
   return plainText.split(/\s+/).filter((word) => word.trim().length > 0).length;
};

export const getActivityData = (journalEntries: Journal[]): ActivityDay[] => {
   const dateRange = eachDayOfInterval({
      start: sixMonthsAgo,
      end: today,
   });

   return dateRange.map((date) => {
      const entriesOnDay = journalEntries.filter((entry) => isSameDay(new Date(entry.createdAt), date));

      return {
         date: format(date, 'yyyy-MM-dd'),
         count: entriesOnDay.length,
         // 0 = no entries, 1 = has entries
         level: entriesOnDay.length === 0 ? 0 : 1,
      } as ActivityDay;
   });
};

// Current streak calculation
export const getCurrentStreak = (journalEntries: Journal[]): number => {
   let streak = 0;
   let currentDate = today;

   while (true) {
      const hasEntryOnDay = journalEntries.some((entry) => isSameDay(new Date(entry.createdAt), currentDate));

      if (!hasEntryOnDay) break;

      streak++;
      currentDate = subDays(currentDate, 1);
   }

   return streak;
};

export const getEntriesByMonth = (journalEntries: Journal[]): MonthData[] => {
   const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return {
         month: format(date, 'MMM'),
         year: format(date, 'yyyy'),
         entries: 0,
      };
   }).reverse();

   for (const entry of journalEntries) {
      const entryDate = new Date(entry.createdAt);
      const monthYear = format(entryDate, 'MMM yyyy');

      const monthData = lastSixMonths.find((m) => `${m.month} ${m.year}` === monthYear);

      if (monthData) {
         monthData.entries++;
      }
   }

   return lastSixMonths;
};

export const getAverageLengthByMonth = (journalEntries: Journal[]): WordCountData[] => {
   const currentYear = new Date().getFullYear();
   const months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(currentYear, i, 1);
      return {
         month: format(date, 'MMM'),
         year: currentYear.toString(),
         totalWords: 0,
      };
   });

   for (const entry of journalEntries) {
      const entryDate = new Date(entry.createdAt);
      if (entryDate.getFullYear() === currentYear) {
         const monthIndex = entryDate.getMonth();
         const plainText = stripHtml(entry.content);
         const wordCount = plainText.split(/\s+/).filter((word) => word.trim().length > 0).length;
         months[monthIndex].totalWords += wordCount;
      }
   }

   return months;
};

export const getEntriesWithWordCount = (journalEntries: Journal[]): JournalEntryWithWordCount[] => {
   return journalEntries.map((entry) => ({
      ...entry,
      wordCount: getWordCount(entry.content),
   }));
};

export const chartConfig = {
   entries: {
      label: 'Journal Entries',
      color: 'hsl(var(--chart-1))',
   },
   totalWords: {
      label: 'Total Words',
      color: 'hsl(var(--chart-2))',
   },
};
