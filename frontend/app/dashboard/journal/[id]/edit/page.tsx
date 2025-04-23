'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUpdateJournal } from '@/hooks/mutation';
import { useGetJournalById } from '@/hooks/query';
import { useToast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/lib/utils';
import { ArrowLeft, BookOpen, Brain, HelpCircle, Save, Sparkles, Wand2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const TextEditor = dynamic(() => import('@/components/text-editor'), { ssr: false });

export default function EditJournal({ params }: { params: Promise<{ id: string }> }) {
   const resolvedParams = React.use(params);
   const router = useRouter();
   const { data: journal, isPending: isLoading } = useGetJournalById(resolvedParams.id);
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const { mutate, isPending: isSaving } = useUpdateJournal();
   const { toast } = useToast();

   useEffect(() => {
      if (journal) {
         setTitle(journal.title);
         setContent(journal.content);
      }
   }, [journal]);

   const updateJournal = () => {
      if (!content.trim() || !title.trim()) return;
      mutate(
         {
            id: resolvedParams.id,
            title,
            content,
         },
         {
            onSuccess: () => {
               toast({
                  title: 'Journal entry updated',
                  description: 'Your journal entry has been updated successfully.',
               });
               router.push(`/dashboard/journal/${resolvedParams.id}`);
            },
            onError: (error: Error) => {
               toast({
                  title: 'Failed to update journal entry',
                  description: getErrorMessage(error),
                  variant: 'destructive',
               });
            },
         }
      );
   };

   if (isLoading) {
      return (
         <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
         </div>
      );
   }

   return (
      <div className="container py-6 px-4 2xl:mx-auto">
         <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
               <Link href={`/dashboard/journal/${resolvedParams.id}`}>
                  <Button variant="ghost" size="icon">
                     <ArrowLeft className="w-4 h-4" />
                  </Button>
               </Link>
               <h1 className="text-2xl font-bold">Edit Journal Entry</h1>
            </div>
            <div className="flex items-center gap-2">
               <Button onClick={updateJournal} disabled={isSaving || !title.trim() || !content.trim()}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
               </Button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="md:col-span-2">
               <div className="mb-4">
                  <Input
                     type="text"
                     placeholder="Enter journal title..."
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     className="file:text-xl md:text-2xl font-medium file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-15 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                  />
               </div>
               <TextEditor content={content} onChange={setContent} />
            </div>

            <div className="md:col-span-1">
               <div className="border rounded-lg p-4 bg-slate-50">
                  <div className="flex items-center gap-2 mb-4">
                     <HelpCircle className="w-5 h-5 text-indigo-500" />
                     <h2 className="text-lg font-semibold">Tips & Tricks</h2>
                  </div>

                  <div className="space-y-4">
                     <div className="p-3 rounded-lg border">
                        <div className="flex items-start gap-2">
                           <Sparkles className="w-4 h-4 text-amber-500 mt-1" />
                           <div>
                              <h3 className="font-medium text-sm">Use Formatting Tools</h3>
                              <p className="text-sm text-muted-foreground">Use the menu bar above the editor to format text with headings, bold, italics, and lists.</p>
                           </div>
                        </div>
                     </div>

                     <div className="p-3 rounded-lg border">
                        <div className="flex items-start gap-2">
                           <BookOpen className="w-4 h-4 text-emerald-500 mt-1" />
                           <div>
                              <h3 className="font-medium text-sm">Structure Your Thoughts</h3>
                              <p className="text-sm text-muted-foreground">Use headings (H1, H2, H3) to organize your journal entries into sections.</p>
                           </div>
                        </div>
                     </div>

                     <div className="p-3 rounded-lg border">
                        <div className="flex items-start gap-2">
                           <Brain className="w-4 h-4 text-blue-500 mt-1" />
                           <div>
                              <h3 className="font-medium text-sm">Reflection Prompts</h3>
                              <p className="text-sm text-muted-foreground">Consider including: What went well today? What challenged you? What are you grateful for?</p>
                           </div>
                        </div>
                     </div>

                     <div className="p-3 rounded-lg border">
                        <div className="flex items-start gap-2">
                           <Wand2 className="w-4 h-4 text-purple-500 mt-1" />
                           <div>
                              <h3 className="font-medium text-sm">Auto-Save Feature</h3>
                              <p className="text-sm text-muted-foreground">Your changes are not automatically saved. Remember to click the Save Changes button when you're done.</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
