import * as Chat from "@/data-access/chat";
import * as Journal from "@/data-access/journal";
import * as MicroExercise from "@/data-access/micro-exercises";
import * as User from "@/data-access/user";

import { useMutation } from "@tanstack/react-query";

export function useChat() {
  return useMutation({
    mutationKey: ["chat"],
    mutationFn: Chat.chatWithChatbot,
  });
}

export const useCreateJournal = () => {
  return useMutation({
    mutationKey: ["createJournal"],
    mutationFn: Journal.createJournal,
  });
};

export const useUpdateJournal = () => {
  return useMutation({
    mutationKey: ["updateJournal"],
    mutationFn: Journal.updateJournal,
  });
};

export const useGenerateMicroExercise = () => {
  return useMutation({
    mutationKey: ["generateMicroExercise"],
    mutationFn: MicroExercise.generateMicroExercise,
  });
};

export const useSubmitMicroExercise = () => {
  return useMutation({
    mutationKey: ["submitMicroExercise"],
    mutationFn: MicroExercise.submitMicroExercise,
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["user-update"],
    mutationFn: User.updateUser,
  });
};
