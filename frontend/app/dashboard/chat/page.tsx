'use client';

import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '@/components/chat/chat-bubble';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessageList } from '@/components/chat/chat-message-list';
import { MessagesSidebar } from '@/components/chat/messages-sidebar';
import { useChat } from '@/hooks/mutation';
import { useToast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/lib/utils';
import useChatStore from '@/store/chat';
import { Send } from 'lucide-react';
import type React from 'react';
import { useRef, useState } from 'react';

export default function ChatPage() {
   const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
   const { chat, resetChat, setStreamText, streamText, resetStream, setChat } = useChatStore();
   const messageEndRef = useRef<HTMLDivElement | null>(null);
   const { toast } = useToast();
   const [prompt, setPrompt] = useState<string>('');

   const handleStream = async (response: Response) => {
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let result = '';

      if (reader) {
         while (true) {
            const { done, value } = await reader.read();
            if (done) {
               resetStream();
               setChat({ sender: 'model', message: result });
               break;
            }

            const chunk = decoder.decode(value, { stream: true });
            result += chunk;
            setStreamText(chunk);
         }
      } else {
         toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your request, Try again',
         });
      }
   };

   const { mutate: chatWithChatbot } = useChat();
   const handleSubmit = (e?: React.MouseEvent | React.KeyboardEvent) => {
      if (e) {
         e.preventDefault();
         e.stopPropagation();
      }
      
      console.log('working', prompt, selectedTopicId);

      if (prompt.length === 0) return;
      if (!selectedTopicId)
         return toast({
            title: 'Please select a topic',
            variant: 'destructive',
         });
      setPrompt('');
      setChat({ sender: 'user', message: prompt });
      chatWithChatbot(
         {
            chatbotId: selectedTopicId,
            prompt: prompt,
         },
         {
            onSuccess: (response) => {
               console.log('response', response);
               handleStream(response);
            },
            onError: (error) => {
               toast({
                  variant: 'destructive',
                  title: getErrorMessage(error),
               });
            },
         }
      );
   };

   return (
      <div className="flex h-[calc(100vh-4rem)] bg-background">
         <MessagesSidebar resetChat={resetChat} selectedTopicId={selectedTopicId} onTopicSelect={setSelectedTopicId} />
         {!selectedTopicId ? (
            <BlankChat />
         ) : (
            <>
               <div className="flex-1 flex flex-col">
                  <header className="h-[60px] border-b flex items-center justify-between px-6 bg-background">
                     <h1 className="text-xl font-semibold text-primary">Doctor Freud.ai</h1>
                     {/* <div className="flex items-center gap-2">
            <button type="button" className="p-2 hover:bg-accent/50 rounded-full">
              <Search className="h-5 w-5 text-primary" />
            </button>
            <button type="button" className="p-2 hover:bg-accent/50 rounded-full">
              <Settings className="h-5 w-5 text-primary" />
            </button>
          </div> */}
                  </header>
                  <div className="flex-1 overflow-hidden">
                     <ChatMessageList>
                        {Array.isArray(chat) &&
                           chat?.map((chat, i) => (
                              <ChatBubble key={`${chat.message}-${i}`} variant={chat.sender === 'user' ? 'sent' : 'received'} className={chat.sender === 'user' ? 'max-w-[85%]' : ''}>
                                 <ChatBubbleAvatar
                                    src={chat.sender === 'user' ? 'U' : 'A'}
                                    fallback={chat.sender === 'user' ? 'U' : 'A'}
                                    className={`h-8 w-8 relative -top-7 ${chat.sender === 'model' ? 'bg-secondary' : ''}`}
                                 />
                                 <ChatBubbleMessage
                                    variant={chat.sender === 'user' ? 'sent' : 'received'}
                                    className={
                                       chat.sender === 'user'
                                          ? 'bg-primary text-primary-foreground rounded-[20px] rounded-tr-none'
                                          : 'bg-secondary text-secondary-foreground rounded-[20px] rounded-tl-none'
                                    }
                                 >
                                    {chat.message}
                                 </ChatBubbleMessage>
                              </ChatBubble>
                           ))}

                        {streamText.length !== 0 ? (
                           <ChatBubbleMessage variant={'received'} className={'bg-secondary text-secondary-foreground rounded-[20px] rounded-tl-none'}>
                              {streamText}
                           </ChatBubbleMessage>
                        ) : null}
                        <div ref={messageEndRef} />
                     </ChatMessageList>
                  </div>
                  <div className="p-4 border-t bg-background">
                     <div className="relative border rounded-lg">
                        <ChatInput
                           onChange={(e) => setPrompt(e.target.value)}
                           value={prompt}
                           placeholder="Send your message to Dr. freud..."
                           className="bg-card border-0 shadow-none pr-12 rounded-2xl"
                           onSubmit={handleSubmit}
                        />
                        <button
                           onClick={handleSubmit}
                           type="button"
                           className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                           aria-label="Send message"
                        >
                           <Send className="h-4 w-4" />
                        </button>
                     </div>
                  </div>
               </div>
            </>
         )}
      </div>
   );
}

function BlankChat() {
   return (
      <div className="flex-1 flex flex-col h-full justify-center items-center">
         <div className="flex justify-center items-center">
            <h5>Please select a topic to start chatting</h5>
         </div>
      </div>
   );
}
