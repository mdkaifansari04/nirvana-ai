'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export function Providers({ children }: { children: ReactNode }) {
   const [queryClient] = useState(() => new QueryClient());

   return (
      <ClerkProvider>
         <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ClerkProvider>
   );
}
