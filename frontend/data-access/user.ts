import { createApiClient } from './client';

const userApi = createApiClient('/users');

export const updateUser = async (body: { userId: string; age: number; weight: number; gender: string; symptom: string[] }) => {
   const { data } = await userApi.put(`/${body.userId}`, body);
   return data.data;
};
