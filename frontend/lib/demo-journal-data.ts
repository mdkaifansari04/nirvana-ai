import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import { stripHtml } from './utils';

// Generate dates for the last 6 months
const today = new Date();
const sixMonthsAgo = subDays(today, 180);

// Define journal entry type
interface JournalEntry {
   id: string;
   userClerkId: string;
   title: string;
   content: string;
   createdAt: string;
   updatedAt: string;
}

// Helper function to create a date in a specific month
const createDate = (month: number, day: number) => {
   const date = new Date();
   date.setMonth(month);
   date.setDate(day);
   return date;
};

// Helper function to get accurate word count from HTML content
const getWordCount = (htmlContent: string): number => {
   const plainText = stripHtml(htmlContent);
   return plainText.split(/\s+/).filter((word) => word.trim().length > 0).length;
};

// Demo journal entries
export const demoJournalEntries: JournalEntry[] = [
   {
      id: '1',
      userClerkId: 'user_123',
      title: 'April Morning',
      content: `<div class="journal-entry">
      <h1>April Morning</h1>
      <p>Spring is in full bloom. The garden looks beautiful with all the new flowers.</p>
      <ul>
        <li>New flowers blooming</li>
        <li>Garden maintenance</li>
        <li>Spring cleaning</li>
      </ul>
    </div>`,
      createdAt: createDate(3, 1).toISOString(),
      updatedAt: createDate(3, 1).toISOString(),
   },
   {
      id: '2',
      userClerkId: 'user_123',
      title: 'Project Update',
      content: `<div class="journal-entry">
      <h2>Project Update</h2>
      <p><strong>Made good progress</strong> on the new feature implementation.</p>
      <ol>
        <li>Completed backend integration</li>
        <li>Implemented frontend components</li>
        <li>Fixed critical bugs</li>
      </ol>
    </div>`,
      createdAt: createDate(3, 5).toISOString(),
      updatedAt: createDate(3, 5).toISOString(),
   },
   {
      id: '3',
      userClerkId: 'user_123',
      title: 'Weekend Plans',
      content: `<div class="journal-entry">
      <h3>Weekend Plans</h3>
      <p><em>Planning a picnic</em> with friends this weekend.</p>
      <p><mark>Don't forget to bring:</mark></p>
      <ul>
        <li>Picnic basket</li>
        <li>Blanket</li>
        <li>Snacks</li>
      </ul>
    </div>`,
      createdAt: createDate(3, 11).toISOString(),
      updatedAt: createDate(3, 11).toISOString(),
   },
   {
      id: '4',
      userClerkId: 'user_123',
      title: 'Evening Thoughts',
      content: `<div class="journal-entry">
      <h1>Evening Thoughts</h1>
      <p><s>Old plans</s> <strong>New ideas</strong> for the month's progress.</p>
      <p><mark>Key achievements:</mark></p>
      <ol>
        <li>Completed major milestones</li>
        <li>Improved team collaboration</li>
        <li>Enhanced productivity</li>
      </ol>
    </div>`,
      createdAt: createDate(3, 15).toISOString(),
      updatedAt: createDate(3, 15).toISOString(),
   },
   {
      id: '5',
      userClerkId: 'user_123',
      title: 'March Start',
      content: `<div class="journal-entry">
      <h2>March Start</h2>
      <p><em>Beginning of spring</em>, new projects starting.</p>
      <p><mark>Goals for March:</mark></p>
      <ul>
        <li>Launch new features</li>
        <li>Improve documentation</li>
        <li>Enhance user experience</li>
      </ul>
    </div>`,
      createdAt: createDate(2, 1).toISOString(),
      updatedAt: createDate(2, 1).toISOString(),
   },
   {
      id: '6',
      userClerkId: 'user_123',
      title: 'Mid-March',
      content: `<div class="journal-entry">
      <h3>Mid-March</h3>
      <p><strong>Halfway through the month</strong>, making steady progress.</p>
      <p><mark>Current status:</mark></p>
      <ol>
        <li>Project A: 75% complete</li>
        <li>Project B: 50% complete</li>
        <li>Project C: 25% complete</li>
      </ol>
    </div>`,
      createdAt: createDate(2, 15).toISOString(),
      updatedAt: createDate(2, 15).toISOString(),
   },
   {
      id: '7',
      userClerkId: 'user_123',
      title: 'March End',
      content: `<div class="journal-entry">
      <h1>March End</h1>
      <p><s>Initial plans</s> <strong>Final achievements</strong> for the month's activities.</p>
      <p><mark>Summary:</mark></p>
      <ul>
        <li>All projects completed</li>
        <li>Team performance improved</li>
        <li>New processes implemented</li>
      </ul>
    </div>`,
      createdAt: createDate(2, 28).toISOString(),
      updatedAt: createDate(2, 28).toISOString(),
   },
];

// Define types for activity data
interface ActivityDay {
   date: string;
   count: number;
   level: 0 | 1; // Simplified to just 0 or 1
}

interface MonthData {
   month: string;
   year: string;
   entries: number;
}

interface AverageLengthData {
   month: string;
   year: string;
   average: number;
}

// New interface for total word count
interface WordCountData {
   month: string;
   year: string;
   totalWords: number;
}

interface JournalEntryWithWordCount extends JournalEntry {
   wordCount: number;
}

// Calculate activity data for the calendar view
export const getActivityData = (): ActivityDay[] => {
   const dateRange = eachDayOfInterval({
      start: sixMonthsAgo,
      end: today,
   });

   return dateRange.map((date) => {
      const entriesOnDay = demoJournalEntries.filter((entry) => isSameDay(new Date(entry.createdAt), date));

      return {
         date: format(date, 'yyyy-MM-dd'),
         count: entriesOnDay.length,
         // Simplified activity level: 0 = no entries, 1 = has entries
         level: entriesOnDay.length === 0 ? 0 : 1,
      } as ActivityDay;
   });
};

// Current streak calculation
export const getCurrentStreak = (): number => {
   let streak = 0;
   let currentDate = today;

   while (true) {
      const hasEntryOnDay = demoJournalEntries.some((entry) => isSameDay(new Date(entry.createdAt), currentDate));

      if (!hasEntryOnDay) break;

      streak++;
      currentDate = subDays(currentDate, 1);
   }

   return streak;
};

// Entries by month for monthly trend chart
export const getEntriesByMonth = (): MonthData[] => {
   const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return {
         month: format(date, 'MMM'),
         year: format(date, 'yyyy'),
         entries: 0,
      };
   }).reverse();

   for (const entry of demoJournalEntries) {
      const entryDate = new Date(entry.createdAt);
      const monthYear = format(entryDate, 'MMM yyyy');

      const monthData = lastSixMonths.find((m) => `${m.month} ${m.year}` === monthYear);

      if (monthData) {
         monthData.entries++;
      }
   }

   return lastSixMonths;
};

export const getAverageLengthByMonth = (): WordCountData[] => {
   const currentYear = new Date().getFullYear();
   const months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(currentYear, i, 1);
      return {
         month: format(date, 'MMM'),
         year: currentYear.toString(),
         totalWords: 0,
      };
   });

   for (const entry of demoJournalEntries) {
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

// Get word counts for entries
export const getEntriesWithWordCount = (): JournalEntryWithWordCount[] => {
   return demoJournalEntries.map((entry) => ({
      ...entry,
      wordCount: getWordCount(entry.content),
   }));
};

// Get chart config for visualizations
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
