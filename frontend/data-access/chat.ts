import { buildApiPath, createApiClient, getAuthorizationFallbackHeaders } from './client';
import type { Chat, Response } from './response';

const chatApi = createApiClient('/chat');

export const getChatsByChatbotId = async (chatbotId: string | null) => {
   const { data } = await chatApi.get<Response<Chat>>(`/${chatbotId}`);
   return data.data;
};

export const chatWithChatbot = async (body: { prompt: string; chatbotId: string }) => {
   const requestPath = buildApiPath(`/chat/${body.chatbotId}`);

   const response = await fetch(requestPath, {
      method: 'POST',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
         ...getAuthorizationFallbackHeaders(requestPath),
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
