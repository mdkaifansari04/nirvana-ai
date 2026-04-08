import { createApiClient } from './client';
import type { Journal, Response } from './response';

const journalApi = createApiClient('/journals');

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
