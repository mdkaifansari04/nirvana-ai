import { beforeEach, describe, expect, test } from 'bun:test';

import { createJournal, getJournal, getJournalById, updateJournal } from '../journal';

const createLocalStorageMock = (): Storage => {
   const store = new Map<string, string>();

   return {
      get length() {
         return store.size;
      },
      clear() {
         store.clear();
      },
      getItem(key: string) {
         return store.get(key) ?? null;
      },
      key(index: number) {
         return Array.from(store.keys())[index] ?? null;
      },
      removeItem(key: string) {
         store.delete(key);
      },
      setItem(key: string, value: string) {
         store.set(key, value);
      },
   };
};

describe('journal data access', () => {
   beforeEach(() => {
      Object.defineProperty(globalThis, 'localStorage', {
         configurable: true,
         value: createLocalStorageMock(),
      });
   });

   test('creates and reads journal entries from browser storage', async () => {
      const created = await createJournal({
         title: 'Morning reflection',
         content: '<p>Today felt steady.</p>',
      });

      expect(created.title).toBe('Morning reflection');
      expect(created.content).toBe('<p>Today felt steady.</p>');
      expect(created.userClerkId).toBe('local-user');

      await expect(getJournal()).resolves.toEqual([created]);
   });

   test('reads a journal entry by id from browser storage', async () => {
      const created = await createJournal({
         title: 'Evening reflection',
         content: '<p>Small wins counted.</p>',
      });

      await expect(getJournalById({ id: created._id })).resolves.toEqual(created);
   });

   test('updates a journal entry in browser storage', async () => {
      const created = await createJournal({
         title: 'Draft',
         content: '<p>Initial note.</p>',
      });

      const updated = await updateJournal({
         id: created._id,
         title: 'Updated',
         content: '<p>Clearer note.</p>',
      });

      expect(updated).toMatchObject({
         _id: created._id,
         title: 'Updated',
         content: '<p>Clearer note.</p>',
      });
      expect(updated.updatedAt).not.toBe(created.updatedAt);

      await expect(getJournalById({ id: created._id })).resolves.toEqual(updated);
   });
});
