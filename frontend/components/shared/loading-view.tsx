import { Card, CardContent } from "@/components/ui/card";
import { Book, Calendar, Clock, Trophy } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import React from "react";

export const ChatbotLoadingView = () => {
  return (
    <div className="grid gap-1 grid-col-1">
      <ChatbotLoadingItem />
      <ChatbotLoadingItem />
      <ChatbotLoadingItem />
      <ChatbotLoadingItem />
      <ChatbotLoadingItem />
      <ChatbotLoadingItem />
    </div>
  );
};

const ChatbotLoadingItem = () => {
  return (
    <div className="flex items-center gap-3 py-3 px-4 border-b rounded-none w-full max-w-sm">
      <Skeleton className="h-6 w-6 rounded-sm" />
      <Skeleton className="h-4 w-40" />
    </div>
  );
};

export const ChatLoadingView = () => {
  return (
    <div className="flex items-center gap-3 py-3 px-4 border-b rounded-none w-full max-w-sm">
      <Skeleton className="h-6 w-6 rounded-sm" />
      <Skeleton className="h-4 w-40" />
    </div>
  );
};

export default function CurrentStreakLoadingView() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <StreakCard icon={<Trophy className="h-4 w-4 text-muted-foreground" />} />
      <StreakCard icon={<Book className="h-4 w-4 text-muted-foreground" />} />
      <StreakCard icon={<Calendar className="h-4 w-4 text-muted-foreground" />} />
    </div>
  );
}

function StreakCard({ icon }: { icon: React.ReactNode }) {
  return (
    <Card className="overflow-hidden border shadow-none">
      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-24" />
          {icon}
        </div>
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-4 w-32" />
      </CardContent>
    </Card>
  );
}

export function WordSkeletonLoadingView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <WordCardSkeleton />
      <WordCardSkeleton />
      <WordCardSkeleton />
      <WordCardSkeleton />
    </div>
  );
}

function WordCardSkeleton() {
  return (
    <Card className="h-full border overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-20" /> {/* title */}
          <Skeleton className="h-6 w-14 rounded-full" /> {/* badge */}
        </div>
        <Skeleton className="h-4 w-24" /> {/* description */}
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <Skeleton className="h-4 w-24" /> {/* date */}
        </div>
      </CardContent>
    </Card>
  );
}

export function JournalCardSkeleton() {
  return (
    <Card className="w-full border-none shadow-md gap-0">
      <div className="flex items-center justify-between mb-4 px-5">
        <Skeleton className="h-6 w-32" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-24" /> {/* Date */}
          <Skeleton className="h-4 w-16" /> {/* Time */}
        </div>
      </div>

      <Skeleton className="h-px w-full mb-4" />

      {/* Content */}
      <div className="px-5">
        <Skeleton className="h-4 w-1/3 mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </Card>
  );
}
