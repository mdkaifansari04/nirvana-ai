import axios from 'axios';
import tokenInterceptors from './token-interceptor';

const userApi = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_HOST_URL}/users` });
userApi.interceptors.request.use(tokenInterceptors);

export const updateUser = async (body: { userId: string; age: number; weight: number; gender: string; symptom: string[] }) => {
   const { data } = await userApi.put(`/${body.userId}`, body);
   return data.data;
};
