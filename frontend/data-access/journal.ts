import axios from 'axios';
import type { Journal, Response } from './response';
import tokenInterceptors from './token-interceptor';

const journalApi = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_HOST_URL}/journals` });
journalApi.interceptors.request.use(tokenInterceptors);

export const createJournal = async (body: { title: string; content: string }) => {
   const { data } = await journalApi.post<Response<Journal>>('/', body);
   return data.data;
};

export const getJournal = async () => {
   const { data } = await journalApi.get<Response<Journal[]>>('/');
   return data.data;
};

export const getJournalById = async (body: { id: string }) => {
   const { data } = await journalApi.get<Response<Journal>>(`/${body.id}`);
   return data.data;
};

export const updateJournal = async (body: { id: string; title: string; content: string }) => {
   const { id, ...updateData } = body;
   const { data } = await journalApi.put<Response<Journal>>(`/${id}`, updateData);
   return data.data;
};
