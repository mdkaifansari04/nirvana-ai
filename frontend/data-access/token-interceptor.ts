import { accessTokenStorage } from '@/utils/token-storage';
import type { InternalAxiosRequestConfig } from 'axios';

function tokenInterceptors(config: InternalAxiosRequestConfig) {
   const token = accessTokenStorage.get();
   if (!config || !token) {
      return config;
   }

   if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
   }

   return config;
}
export default tokenInterceptors;
