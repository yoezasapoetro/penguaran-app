import '@/styles/globals.css'
import Head from "next/head"
import type { AppInitialProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { CssVarsProvider, extendTheme } from '@mui/joy'
import { font } from '@/lib/utils/fonts'

const queryClient = new QueryClient()

const theme = extendTheme({
    components: {
        JoyIconButton: {
            styleOverrides: {
                root: () => ({
                    ['&:active, &:hover']: {
                        backgroundColor: "unset",
                    }
                })
            }
        }
    }
})

export default function App({
    Component,
    pageProps: { session, ...pageProps }
}: AppInitialProps & { Component: any }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <style jsx global>{`
                :root {
                    --joy-fontFamily-body: ${font.style.fontFamily}
                }
            `}</style>
            <SessionProvider session={session}>
                <QueryClientProvider client={queryClient}>
                    <CssVarsProvider theme={theme}>
                        <Component {...pageProps} />
                    </CssVarsProvider>
                </QueryClientProvider>
            </SessionProvider>
        </>
    );
}
