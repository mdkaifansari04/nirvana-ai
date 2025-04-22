import * as Chat from "@/data-access/chat";
import * as Journal from "@/data-access/journal";
import * as MicroExercise from "@/data-access/micro-exercises";

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

export const useGenerateMicroExercise = () => {
  return useMutation({
    mutationKey: ["generateMicroExercise"],
    mutationFn: MicroExercise.generateMicroExercise,
  });
};
