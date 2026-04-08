import { accessTokenStorage, normalizeTokenValue } from '@/utils/token-storage';
import type { InternalAxiosRequestConfig } from 'axios';

const INTERNAL_API_PREFIX = '/api/v1';

function tokenInterceptors(config: InternalAxiosRequestConfig) {
   const requestBaseUrl = config.baseURL ?? '';
   if (requestBaseUrl.startsWith(INTERNAL_API_PREFIX)) {
      return config;
   }

   const token = normalizeTokenValue(accessTokenStorage.get());
   if (!config || !token) {
      return config;
   }

   if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
   }

   return config;
}
export default tokenInterceptors;
