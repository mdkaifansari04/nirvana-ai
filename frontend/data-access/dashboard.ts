import { createApiClient } from './client';
import type { Chat, Journal, MicroExercise, Response } from './response';

const journalApi = createApiClient('/journals');

const microExerciseApi = createApiClient('/micro-exercises');

const chatApi = createApiClient('/chat');

const chatbotApi = createApiClient('/chatbots');

export const getDashboardData = async () => {
   try {
      const { data: journalData } = await journalApi.get<Response<Journal[]>>('/');
      const journals = journalData.data || [];

      const { data: exerciseData } = await microExerciseApi.get<Response<MicroExercise[]>>('/');
      const microExercises = exerciseData.data || [];

      const { data: chatbotData } = await chatbotApi.get<Response<{ _id: string }[]>>('/');

      let chats: Chat[] = [];
      if (chatbotData.data && chatbotData.data.length > 0) {
         const firstChatbotId = chatbotData.data[0]._id;
         const { data: chatData } = await chatApi.get<Response<Chat[]>>(`/${firstChatbotId}`);
         chats = chatData.data || [];
      }

      return {
         journals,
         microExercises,
         chats,
      };
   } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return {
         journals: [],
         microExercises: [],
         chats: [],
      };
   }
};
