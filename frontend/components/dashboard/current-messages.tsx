'use client';

import type { Chat } from '@/data-access/response';
import { format } from 'date-fns';
import Image from 'next/image';

interface CurrentMessagesProps {
   chats: Chat[];
}

export default function CurrentMessages({ chats }: CurrentMessagesProps) {
   const allMessages = chats.flatMap((chat) =>
      chat.messages.map((message) => ({
         id: message._id,
         content: message.text,
         sender: message.sender,
         time: format(new Date(message.timestamps), 'h:mm a'),
         chatId: chat._id,
      }))
   );

   const recentMessages = allMessages.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5);

   return (
      <div className="space-y-4">
         {recentMessages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No recent messages</div>
         ) : (
            <div className="space-y-3">
               {recentMessages.map((message) => (
                  <div key={message.id} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                     <div className="flex-shrink-0">
                        <Image src={message.sender === 'model' ? '/female.svg' : '/male.svg'} alt="Avatar" width={40} height={40} className="rounded-full" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                           <div className="font-medium">{message.sender === 'model' ? 'AI Assistant' : 'You'}</div>
                           <div className="text-xs text-muted-foreground">{message.time}</div>
                        </div>
                        <div className="text-sm mt-1 line-clamp-2">{message.content}</div>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}
