import * as Chat from "@/data-access/chat";
import * as Chatbot from "@/data-access/chatbot";
import * as Dashboard from "@/data-access/dashboard";
import * as Journal from "@/data-access/journal";
import * as MicroExercise from "@/data-access/micro-exercises";
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

export const useGetMicroServices = () => {
  return useQuery({
    queryKey: ["getMicroServices"],
    queryFn: () => MicroExercise.getMicroServices(),
  });
};

export const useGetMicroExerciseReportById = (id: string) => {
  return useQuery({
    queryKey: ["getMicroExerciseReportById", id],
    queryFn: () => MicroExercise.getMicroExerciseReportById(id),
  });
};

export const useGetDashboardData = () => {
  return useQuery({
    queryKey: ["getDashboardData"],
    queryFn: () => Dashboard.getDashboardData(),
  });
};
