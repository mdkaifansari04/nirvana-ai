import axios from 'axios';

import { accessTokenStorage, normalizeTokenValue } from '@/utils/token-storage';
import tokenInterceptors from './token-interceptor';

export const API_V1_PREFIX = '/api/v1';

const normalizePath = (path: string): string => {
   if (path.length === 0) {
      return '/';
   }

   return path.startsWith('/') ? path : `/${path}`;
};

export const buildApiPath = (path: string): string => {
   return `${API_V1_PREFIX}${normalizePath(path)}`;
};

export const buildAuthorizationHeader = (token: string | null | undefined): Record<string, string> => {
   const normalizedToken = normalizeTokenValue(token);
   if (!normalizedToken) {
      return {};
   }

   return {
      Authorization: `Bearer ${normalizedToken}`,
   };
};

const isInternalApiPath = (requestPath: string): boolean => {
   return requestPath.startsWith(API_V1_PREFIX);
};

export const getAuthorizationFallbackHeaders = (requestPath: string, tokenOverride?: string | null): Record<string, string> => {
   if (isInternalApiPath(requestPath)) {
      return {};
   }

   return buildAuthorizationHeader(tokenOverride ?? accessTokenStorage.get());
};

export const createApiClient = (resourcePath: string) => {
   const client = axios.create({
      baseURL: buildApiPath(resourcePath),
      withCredentials: true,
   });

   client.interceptors.request.use(tokenInterceptors);

   return client;
};
