import { Journal } from "@/data-access/response";
import type { LucideIcon } from "lucide-react";

export interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
  children?: SidebarItem[];
}

export interface Topic {
  id: string;
  title: string;
  icon: string;
  count?: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "assistant";
  avatar?: string;
}

export interface TopicChat {
  id: string;
  messages: ChatMessage[];
}

export interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1; // 0 = no entries, 1 = has entries
}

export interface MonthData {
  month: string;
  year: string;
  entries: number;
}

export interface AverageLengthData {
  month: string;
  year: string;
  average: number;
}

export interface WordCountData {
  month: string;
  year: string;
  totalWords: number;
}

export interface JournalEntryWithWordCount extends Journal {
  wordCount: number;
}

export interface QnA {
  question: string;
  answer: string;
}

export interface MCQ {
  question: string;
  options: string[];
  answers: string[];
}

export interface QuickCheckIn {
  mood_rating: number;
  primary_emotion: string;
}

export interface UserReflection {
  mood_rating_after: number;
  reflection: string;
}

export interface ExerciseContent {
  qna: QnA[];
  mcq: MCQ[];
}

export interface AIReport {
  review: string;
  feedback: string;
}

export interface MicroExercise {
  id: string;
  userClerkId: string;
  session_goal: string;
  quick_check_in: QuickCheckIn;
  exercise_content: ExerciseContent;
  user_reflection: UserReflection;
  ai_generated_report: AIReport;
  createdAt: string;
  updatedAt: string;
}

export interface ExerciseSummary {
  totalExercises: number;
  completedThisWeek: number;
  averageMoodImprovement: number;
  streak: number;
}

export interface ActivityData {
  date: string;
  journal: number;
  exercise: number;
  message: number;
}

export interface MoodScore {
  score: number;
  label: string;
  color: string;
}

export interface RecentMessage {
  id: string;
  content: string;
  sender: "user" | "assistant";
  avatar: string;
  time: string;
}
