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
        <>
            <style jsx global>{`
                :root {
                    --joy-fontFamily-body: ${font.style.fontFamily}
                }
            `}</style>
            <SessionProvider session={session}>
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                </QueryClientProvider>
            </SessionProvider>
        </>
    );
}
