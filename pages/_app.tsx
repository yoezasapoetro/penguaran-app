import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"
import { font } from "@/lib/utils/fonts"

export const theme = extendTheme({
    fonts: {
        heading: "var(--font-sans)",
        body: "var(--font-sans)",
    }
})

export default function PenguaranApp({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <>
            <style jsx global>
                {`
                    :root {
                        --font-sans: ${font.style.fontFamily}
                    }
                `}
            </style>
            <SessionProvider session={session}>
                <ChakraProvider theme={theme}>
                    <Component {...pageProps} />
                </ChakraProvider>
            </SessionProvider>
        </>
    )
}
