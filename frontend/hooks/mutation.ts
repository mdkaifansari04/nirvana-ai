import { useMutation } from "@tanstack/react-query";
import * as Chat from "@/data-access/chat";
import * as Journal from "@/data-access/journal";

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
