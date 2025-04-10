import { demoTopics } from '@/lib/demo-chat-data';
import { Plus, Share } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface TopicSidebarProps {
   selectedTopicId: string;
   onTopicSelect: (id: string) => void;
}

export function MessagesSidebar({ selectedTopicId, onTopicSelect }: TopicSidebarProps) {
   const handleTopicSelect = (id: string) => {
      onTopicSelect(id);
   };

   const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
      if (e.key === 'Enter' || e.key === ' ') {
         e.preventDefault();
         onTopicSelect(id);
      }
   };

   return (
      <div className="w-80 border-r bg-background flex flex-col">
         <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold text-lg text-primary" href="/dashboard">
               <span className="text-primary">🔗</span>
               Topics
               <span className="ml-auto text-primary">24</span>
            </Link>
         </div>
         <div className="flex-1 overflow-auto">
            {demoTopics.map((topic) => (
               <button
                  key={topic.id}
                  onClick={() => handleTopicSelect(topic.id)}
                  type="button"
                  aria-pressed={topic.id === selectedTopicId}
                  className={`border-b flex w-full items-center gap-3 px-6 py-3 cursor-pointer hover:bg-accent/50 transition-colors ${topic.id === selectedTopicId ? 'bg-accent/50' : ''} text-left`}
               >
                  <div className="w-6 h-6 relative flex-shrink-0">
                     <Image src={topic.icon} alt={topic.title} width={24} height={24} className="object-contain" />
                  </div>
                  <div className="flex-1 truncate">
                     <h3 className="text-sm font-medium leading-none text-primary">{topic.title}</h3>
                  </div>
                  {topic.count && <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-accent/50 text-sm text-primary">{topic.count}</span>}
               </button>
            ))}
         </div>
         <div className="mt-auto p-4">
            <button type="button" className="w-full bg-primary text-primary-foreground rounded-full py-3 px-4 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
               <Plus className="h-4 w-4" />
               Add a New Conversation
            </button>
         </div>
      </div>
   );
}
