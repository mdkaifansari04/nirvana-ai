import { describe, expect, test } from 'bun:test';

import { normalizeTokenValue } from '../token-storage';

describe('token-storage normalizeTokenValue', () => {
   test('returns null for null-like token values', () => {
      expect(normalizeTokenValue(null)).toBeNull();
      expect(normalizeTokenValue(undefined)).toBeNull();
      expect(normalizeTokenValue('')).toBeNull();
      expect(normalizeTokenValue('   ')).toBeNull();
      expect(normalizeTokenValue('null')).toBeNull();
      expect(normalizeTokenValue('undefined')).toBeNull();
   });

   test('returns trimmed token for valid values', () => {
      expect(normalizeTokenValue('token_123')).toBe('token_123');
      expect(normalizeTokenValue('  token_abc  ')).toBe('token_abc');
   });
});
