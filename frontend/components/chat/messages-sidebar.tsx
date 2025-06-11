import { useGetChatbots } from '@/hooks/query';
import useAppStore from '@/store/app';
import Link from 'next/link';
import { FadeImg } from '../shared/fade-img';
import { ChatbotLoadingView } from '../shared/loading-view';
import QueryWrapper from '../shared/wrapper';

interface TopicSidebarProps {
   selectedTopicId: string | null;
   onTopicSelect: (id: string) => void;
   resetChat: () => void;
}

export function MessagesSidebar({ selectedTopicId, onTopicSelect, resetChat }: TopicSidebarProps) {
   const { data: chatbots, isLoading, error, isError } = useGetChatbots();
   const { setChatbotId } = useAppStore();
   const handleTopicSelect = (id: string) => {
      setChatbotId(id);
      onTopicSelect(id);
      resetChat();
   };

   const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
      if (e.key === 'Enter' || e.key === ' ') {
         e.preventDefault();
         onTopicSelect(id);
      }
   };

   return (
      <div className="w-full border-r bg-background flex flex-col">
         <div className="flex h-[60px] items-center border-b px-6">
            <Link className="font-semibold text-lg text-primary" href="/dashboard">
               <span className="text-primary">🔗 Topics</span>
            </Link>
            <span className="ml-auto text-primary">{chatbots?.length}</span>
         </div>
         <QueryWrapper
            isError={isError}
            error={error}
            isPending={isLoading}
            data={chatbots}
            pendingView={<ChatbotLoadingView />}
            view={chatbots?.map((topic) => (
               <button
                  key={topic._id}
                  onClick={() => handleTopicSelect(topic._id)}
                  type="button"
                  aria-pressed={topic._id === selectedTopicId}
                  className={`border-b flex w-full items-center gap-3 px-6 py-3 cursor-pointer hover:bg-accent/50 transition-colors ${topic._id === selectedTopicId ? 'bg-accent/50' : ''} text-left`}
               >
                  <div className="w-6 h-6 relative flex-shrink-0">
                     <FadeImg src={topic.image} alt={topic.name} width={24} height={24} className="object-contain" />
                  </div>
                  <div className="flex-1 truncate">
                     <h3 className="text-sm font-medium leading-none text-primary">{topic.name}</h3>
                  </div>
               </button>
            ))}
         />
      </div>
   );
}
