import * as Chatbot from "@/data-access/chatbot";
import * as Chat from "@/data-access/chat";
import * as Journal from "@/data-access/journal";
import { useQuery } from "@tanstack/react-query";

export function useGetChatbots() {
  return useQuery({
    queryKey: ["chatbot"],
    queryFn: () => Chatbot.getChatbots(),
  });
}

export function useGetChatsByChatbotId(chatbotId: string | null) {
  return useQuery({
    queryKey: ["chats", chatbotId],
    queryFn: () => Chat.getChatsByChatbotId(chatbotId),
    enabled: !!chatbotId,
  });
}

export const useGetJournal = () => {
  return useQuery({
    queryKey: ["getJournal"],
    queryFn: () => Journal.getJournal(),
  });
};

export const useGetJournalById = (id: string) => {
  return useQuery({
    queryKey: ["getJournalById", id],
    queryFn: () => Journal.getJournalById({ id }),
  });
};
