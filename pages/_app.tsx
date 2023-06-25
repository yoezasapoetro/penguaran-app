import '@/styles/globals.css';
import type { AppInitialProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { font } from '@/lib/utils/fonts';

export default function App({
    Component,
    pageProps: { session, ...pageProps }
}: AppInitialProps & { Component: any }) {
    return (
        <>
            <SessionProvider session={session}>
                <main className={font.variable}>
                    <Component {...pageProps} />
                </main>
            </SessionProvider>
        </>
    );
}
