'use client';

import { demoDashboard } from '@/lib/demo-dashboard-data';
import Image from 'next/image';

export default function CurrentMessages() {
   const messages = demoDashboard.recentMessages;

   return (
      <div className="space-y-4">
         {messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No recent messages</div>
         ) : (
            <div className="space-y-3">
               {messages.map((message) => (
                  <div key={message.id} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                     <div className="flex-shrink-0">
                        <Image src={message.avatar} alt="Avatar" width={40} height={40} className="rounded-full" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                           <div className="font-medium">{message.sender === 'assistant' ? 'AI Assistant' : 'You'}</div>
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
