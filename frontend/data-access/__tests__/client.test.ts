import { describe, expect, test } from 'bun:test';

import {
   buildApiPath,
   buildAuthorizationHeader,
   createApiClient,
   getAuthorizationFallbackHeaders,
} from '../client';

describe('data access client', () => {
   test('buildApiPath always prefixes /api/v1', () => {
      expect(buildApiPath('journals')).toBe('/api/v1/journals');
      expect(buildApiPath('/chat/abc')).toBe('/api/v1/chat/abc');
   });

   test('buildAuthorizationHeader adds bearer token when provided', () => {
      expect(buildAuthorizationHeader('token_123')).toEqual({
         Authorization: 'Bearer token_123',
      });
   });

   test('buildAuthorizationHeader returns empty object when token is missing', () => {
      expect(buildAuthorizationHeader(null)).toEqual({});
      expect(buildAuthorizationHeader(undefined)).toEqual({});
   });

   test('buildAuthorizationHeader ignores null-like token strings', () => {
      expect(buildAuthorizationHeader('null')).toEqual({});
      expect(buildAuthorizationHeader('undefined')).toEqual({});
      expect(buildAuthorizationHeader('   ')).toEqual({});
   });

   test('getAuthorizationFallbackHeaders ignores bearer token for internal /api/v1 routes', () => {
      expect(getAuthorizationFallbackHeaders('/api/v1/journals', 'token_123')).toEqual({});
   });

   test('getAuthorizationFallbackHeaders can still provide bearer token for non-internal routes', () => {
      expect(getAuthorizationFallbackHeaders('/external-api/journals', 'token_123')).toEqual({
         Authorization: 'Bearer token_123',
      });
   });

   test('createApiClient uses same-origin /api/v1 base with credentials', () => {
      const client = createApiClient('/journals');

      expect(client.defaults.baseURL).toBe('/api/v1/journals');
      expect(client.defaults.withCredentials).toBe(true);
   });
});
