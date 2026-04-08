import { createApiClient } from './client';
import type { Chatbot, Response } from './response';

const chatbotApi = createApiClient('/chatbots');

export const getChatbots = async () => {
   const { data } = await chatbotApi.get<Response<Chatbot[]>>('/');
   return data.data;
};
