import axios from 'axios';
import type { Chat, Journal, MicroExercise, Response } from './response';
import tokenInterceptors from './token-interceptor';

const journalApi = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_HOST_URL}/journals` });
journalApi.interceptors.request.use(tokenInterceptors);

const microExerciseApi = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_HOST_URL}/micro-exercises` });
microExerciseApi.interceptors.request.use(tokenInterceptors);

const chatApi = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_HOST_URL}/chat` });
chatApi.interceptors.request.use(tokenInterceptors);

const chatbotApi = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_HOST_URL}/chatbots` });
chatbotApi.interceptors.request.use(tokenInterceptors);

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
