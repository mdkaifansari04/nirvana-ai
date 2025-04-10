'use client';

import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '@/components/chat/chat-bubble';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessageList } from '@/components/chat/chat-message-list';
import { MessagesSidebar } from '@/components/chat/messages-sidebar';
import { demoChats } from '@/lib/demo-chat-data';
import { Search, Send, Settings } from 'lucide-react';
import React, { useState } from 'react';

export default function ChatPage() {
   const [selectedTopicId, setSelectedTopicId] = useState('1');
   const currentChat = demoChats[selectedTopicId];

   return (
      <div className="flex h-[calc(100vh-4rem)] bg-background">
         <MessagesSidebar selectedTopicId={selectedTopicId} onTopicSelect={setSelectedTopicId} />
         <div className="flex-1 flex flex-col">
            <header className="h-[60px] border-b flex items-center justify-between px-6 bg-background">
               <h1 className="text-xl font-semibold text-primary">Doctor Freud.ai</h1>
               <div className="flex items-center gap-2">
                  <button type="button" className="p-2 hover:bg-accent/50 rounded-full">
                     <Search className="h-5 w-5 text-primary" />
                  </button>
                  <button type="button" className="p-2 hover:bg-accent/50 rounded-full">
                     <Settings className="h-5 w-5 text-primary" />
                  </button>
               </div>
            </header>
            <div className="flex-1 overflow-hidden">
               <ChatMessageList>
                  <div className="py-4 text-center text-sm text-muted-foreground">Today</div>
                  {currentChat?.messages.map((message) => (
                     <ChatBubble key={message.id} variant={message.sender === 'user' ? 'sent' : 'received'} className={message.sender === 'user' ? 'max-w-[85%]' : ''}>
                        <ChatBubbleAvatar src={message.avatar} fallback={message.sender === 'user' ? 'U' : 'A'} className={`h-8 w-8 ${message.sender === 'assistant' ? 'bg-secondary' : ''}`} />
                        <ChatBubbleMessage
                           variant={message.sender === 'user' ? 'sent' : 'received'}
                           className={
                              message.sender === 'user' ? 'bg-primary text-primary-foreground rounded-[20px] rounded-tr-none' : 'bg-secondary text-secondary-foreground rounded-[20px] rounded-tl-none'
                           }
                        >
                           {message.content}
                        </ChatBubbleMessage>
                     </ChatBubble>
                  ))}
               </ChatMessageList>
            </div>
            <div className="p-4 border-t bg-background">
               <div className="relative border rounded-lg">
                  <ChatInput placeholder="Send your message to Dr. freud..." className="bg-card border-0 shadow-none pr-12 rounded-2xl" />
                  <button
                     type="button"
                     className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                     aria-label="Send message"
                  >
                     <Send className="h-4 w-4" />
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
