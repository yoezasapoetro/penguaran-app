import '@/styles/globals.css'
import Head from "next/head"
import type { AppInitialProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import {
    CssVarsProvider as JoyCssVarsProvider,
    extendTheme as extendJoyTheme
} from '@mui/joy/styles'
import {
    Experimental_CssVarsProvider as MaterialCssVarsProvider,
    experimental_extendTheme as extendMaterialTheme,
    THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles'
import { font } from '@/lib/utils/fonts'

const queryClient = new QueryClient()

const joyTheme = extendJoyTheme({
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

const materialTheme = extendMaterialTheme()

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
                    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
                        <JoyCssVarsProvider theme={joyTheme}>
                            <Component {...pageProps} />
                        </JoyCssVarsProvider>
                    </MaterialCssVarsProvider>
                </QueryClientProvider>
            </SessionProvider>
        </>
    );
}
