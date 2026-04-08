import axios from 'axios';

import { accessTokenStorage } from '@/utils/token-storage';
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
   if (!token) {
      return {};
   }

   return {
      Authorization: `Bearer ${token}`,
   };
};

export const getAuthorizationFallbackHeaders = (): Record<string, string> => {
   return buildAuthorizationHeader(accessTokenStorage.get());
};

export const createApiClient = (resourcePath: string) => {
   const client = axios.create({
      baseURL: buildApiPath(resourcePath),
      withCredentials: true,
   });

   client.interceptors.request.use(tokenInterceptors);

   return client;
};
