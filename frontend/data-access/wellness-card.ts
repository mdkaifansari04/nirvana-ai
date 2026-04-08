import { createApiClient } from './client';
import type { Response, WellnessCard } from './response';

const wellnessApi = createApiClient('/wellness-cards');

export const getWellnessCard = async () => {
   const { data } = await wellnessApi.post<Response<WellnessCard[]>>('/generate');
   return data.data;
};
