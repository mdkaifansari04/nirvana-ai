import { createApiClient } from './client';
import { getJournal } from './journal';
import type { Chat, MicroExercise, Response } from './response';

const microExerciseApi = createApiClient('/micro-exercises');

const chatApi = createApiClient('/chat');

const chatbotApi = createApiClient('/chatbots');

export const getDashboardData = async () => {
   const journals = await getJournal();
   let microExercises: MicroExercise[] = [];
   let chats: Chat[] = [];

   try {
      const { data: exerciseData } = await microExerciseApi.get<Response<MicroExercise[]>>('/');
      microExercises = exerciseData.data || [];
   } catch (error) {
      console.error('Error fetching micro exercise data:', error);
   }

   try {
      const { data: chatbotData } = await chatbotApi.get<Response<{ _id: string }[]>>('/');

      if (chatbotData.data && chatbotData.data.length > 0) {
         const firstChatbotId = chatbotData.data[0]._id;
         const { data: chatData } = await chatApi.get<Response<Chat[]>>(`/${firstChatbotId}`);
         chats = chatData.data || [];
      }
   } catch (error) {
      console.error('Error fetching chat data:', error);
   }

   return {
      journals,
      microExercises,
      chats,
   };
};
