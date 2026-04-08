import { describe, expect, test } from 'bun:test';

import { resolveMongoUrl } from '../db';

describe('db env resolution', () => {
   test('prefers MONGO_URL when present', () => {
      const mongoUrl = resolveMongoUrl({ MONGO_URL: 'mongodb://mongo-url', MONGO_URI: 'mongodb://mongo-uri' });
      expect(mongoUrl).toBe('mongodb://mongo-url');
   });

   test('falls back to MONGO_URI for backward compatibility', () => {
      const mongoUrl = resolveMongoUrl({ MONGO_URI: 'mongodb://mongo-uri' });
      expect(mongoUrl).toBe('mongodb://mongo-uri');
   });

   test('throws when neither key is set', () => {
      expect(() => resolveMongoUrl({})).toThrow('MONGO_URL/MONGO_URI is not defined in environment variables.');
   });
});
