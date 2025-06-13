import axios from 'axios';
import type { Chat, Response } from './response';
import tokenInterceptors from './token-interceptor';
import { accessTokenStorage } from '@/utils/token-storage';

const chatApi = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_HOST_URL}/chat` });
chatApi.interceptors.request.use(tokenInterceptors);

export const getChatsByChatbotId = async (chatbotId: string | null) => {
   const { data } = await chatApi.get<Response<Chat>>(`/${chatbotId}`, { withCredentials: true });
   return data.data;
};

export const chatWithChatbot = async (body: { prompt: string; chatbotId: string }) => {
   const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/chat/${body.chatbotId}`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${accessTokenStorage.get()}`
      },
      body: JSON.stringify({
         prompt: body.prompt,
      }),
   });

   if (!response.ok) {
      throw new Error('Failed to fetch chat response');
   }

   return response;
};
