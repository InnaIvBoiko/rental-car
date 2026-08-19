'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface TanStackProviderProps {
    children: ReactNode;
}

export default function TanStackProvider({ children }: TanStackProviderProps) {
    const [queryClient] = useState(() => new QueryClient());

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
