import * as Chat from '@/data-access/chat';
import * as Journal from '@/data-access/journal';
import * as MicroExercise from '@/data-access/micro-exercises';
import type { Journal as JournalEntry } from '@/data-access/response';
import * as User from '@/data-access/user';
import * as WellnessCard from '@/data-access/wellness-card';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useChat() {
   return useMutation({
      mutationKey: ['chat'],
      mutationFn: Chat.chatWithChatbot,
   });
}

export const useCreateJournal = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['createJournal'],
      mutationFn: Journal.createJournal,
      onSuccess: (createdJournal) => {
         queryClient.setQueryData<JournalEntry[]>(['getJournal'], (currentJournals = []) => [...currentJournals, createdJournal]);
         queryClient.setQueryData(['getJournalById', createdJournal._id], createdJournal);
      },
   });
};

export const useUpdateJournal = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: ['updateJournal'],
      mutationFn: Journal.updateJournal,
      onSuccess: (updatedJournal, variables) => {
         queryClient.setQueryData(['getJournalById', variables.id], updatedJournal);
         queryClient.setQueryData<JournalEntry[]>(['getJournal'], (currentJournals = []) => currentJournals.map((journal) => (journal._id === variables.id ? updatedJournal : journal)));
      },
   });
};

export const useGenerateMicroExercise = () => {
   return useMutation({
      mutationKey: ['generateMicroExercise'],
      mutationFn: MicroExercise.generateMicroExercise,
   });
};

export const useSubmitMicroExercise = () => {
   return useMutation({
      mutationKey: ['submitMicroExercise'],
      mutationFn: MicroExercise.submitMicroExercise,
   });
};

export const useUpdateUser = () => {
   return useMutation({
      mutationKey: ['user-update'],
      mutationFn: User.updateUser,
   });
};

export const useGetWellnessCard = () => {
   return useMutation({
      mutationKey: ['getWellnessCard'],
      mutationFn: WellnessCard.getWellnessCard,
   });
};

export const useGetFeedback = () => {
   return useMutation({
      mutationKey: ['getFeedback'],
      mutationFn: MicroExercise.getFeedback,
   });
};
