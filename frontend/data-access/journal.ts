import type { Journal } from './response';

const JOURNAL_STORAGE_KEY = 'nirvana-ai:journals';
const LOCAL_USER_ID = 'local-user';
const JOURNAL_NOT_FOUND_MESSAGE = 'Journal entry not found';

export const createJournal = async (body: { title: string; content: string }) => {
   const journals = readJournals();
   const now = new Date().toISOString();
   const journal: Journal = {
      _id: createJournalId(),
      userClerkId: LOCAL_USER_ID,
      title: body.title,
      content: body.content,
      createdAt: now,
      updatedAt: now,
      __v: 0,
   };

   writeJournals([...journals, journal]);

   return journal;
};

export const getJournal = async () => {
   return readJournals();
};

export const getJournalById = async (body: { id: string }) => {
   const journal = readJournals().find((entry) => entry._id === body.id);
   if (!journal) {
      throw new Error(JOURNAL_NOT_FOUND_MESSAGE);
   }

   return journal;
};

export const updateJournal = async (body: { id: string; title: string; content: string }) => {
   const { id, ...updateData } = body;
   let updatedJournal: Journal | null = null;
   const journals = readJournals().map((journal) => {
      if (journal._id !== id) {
         return journal;
      }

      updatedJournal = {
         ...journal,
         ...updateData,
         updatedAt: nextTimestampAfter(journal.updatedAt),
      };

      return updatedJournal;
   });

   if (!updatedJournal) {
      throw new Error(JOURNAL_NOT_FOUND_MESSAGE);
   }

   writeJournals(journals);

   return updatedJournal;
};

const getStorage = (): Storage | null => {
   if (typeof globalThis.localStorage === 'undefined') {
      return null;
   }

   return globalThis.localStorage;
};

const readJournals = (): Journal[] => {
   const storage = getStorage();
   if (!storage) {
      return [];
   }

   const storedValue = storage.getItem(JOURNAL_STORAGE_KEY);
   if (!storedValue) {
      return [];
   }

   try {
      const parsed = JSON.parse(storedValue);
      return Array.isArray(parsed) ? parsed.filter(isJournal) : [];
   } catch {
      return [];
   }
};

const writeJournals = (journals: Journal[]) => {
   const storage = getStorage();
   if (!storage) {
      return;
   }

   storage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(journals));
};

const createJournalId = () => {
   const randomId = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
   return `local-journal-${randomId}`;
};

const nextTimestampAfter = (currentTimestamp: string) => {
   const currentTime = Date.parse(currentTimestamp);
   const nextTime = Number.isNaN(currentTime) ? Date.now() : Math.max(Date.now(), currentTime + 1);

   return new Date(nextTime).toISOString();
};

const isJournal = (value: unknown): value is Journal => {
   if (!value || typeof value !== 'object') {
      return false;
   }

   const candidate = value as Partial<Journal>;

   return (
      typeof candidate._id === 'string' &&
      typeof candidate.userClerkId === 'string' &&
      typeof candidate.title === 'string' &&
      typeof candidate.content === 'string' &&
      typeof candidate.createdAt === 'string' &&
      typeof candidate.updatedAt === 'string' &&
      typeof candidate.__v === 'number'
   );
};
