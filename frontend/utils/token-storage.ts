'use client';
import { LOCAL_STORAGE_KEY } from '@/constants';

const INVALID_TOKEN_VALUES = new Set(['null', 'undefined']);

export const normalizeTokenValue = (token: string | null | undefined): string | null => {
   if (typeof token !== 'string') {
      return null;
   }

   const trimmed = token.trim();
   if (trimmed.length === 0 || INVALID_TOKEN_VALUES.has(trimmed)) {
      return null;
   }

   return trimmed;
};

class TokenStorage {
   public storageKey: string;

   constructor(key: string) {
      this.storageKey = key;
   }

   set(token: string | null | undefined) {
      if (typeof window === 'undefined') {
         return;
      }

      const normalizedToken = normalizeTokenValue(token);
      if (normalizedToken) {
         localStorage.setItem(this.storageKey, normalizedToken);
      } else {
         localStorage.removeItem(this.storageKey);
      }
   }

   get() {
      if (typeof window !== 'undefined') {
         const storedToken = localStorage.getItem(this.storageKey);
         return normalizeTokenValue(storedToken);
      }
      return null; // Return null if running on the server
   }

   delete() {
      if (typeof window !== 'undefined') {
         localStorage.removeItem(this.storageKey);
      }
   }
}

export const accessTokenStorage = new TokenStorage(LOCAL_STORAGE_KEY);
