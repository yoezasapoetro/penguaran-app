import '@/styles/globals.css';
import type { AppInitialProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { font } from '@/lib/utils/fonts';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient()

export default function App({
    Component,
    pageProps: { session, ...pageProps }
}: AppInitialProps & { Component: any }) {
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <main className={font.variable}>
                    <Component {...pageProps} />
                </main>
            </QueryClientProvider>
        </SessionProvider>
    );
}
