"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetJournalById } from "@/hooks/query";
// import { demoJournalEntries } from '@/lib/demo-journal-data';
import { parseHTML } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Clock, Edit } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default function JournalEntryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  console.log(resolvedParams.id);

  const { data: entry, isPending, isError, error } = useGetJournalById(resolvedParams.id);

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-6 px-4 2xl:mx-auto">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/dashboard/journal">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Journal
            </Button>
          </Link>

          <Link href={`/dashboard/journal/${resolvedParams.id}/edit`}>
            <Button className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Entry
            </Button>
          </Link>
        </div>

        <Card className="border-none shadow-md gap-0">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">{entry.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(entry.createdAt), "MMMM d, yyyy")}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {format(new Date(entry.createdAt), "h:mm a")}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="journal-entry">{parseHTML(entry.content)}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
