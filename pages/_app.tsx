import "assets/styles/globals.css"

import Head from "next/head"
import type { AppType } from "next/app"

import { font } from "utils/fonts"
import { trpc } from "api/utils/trpc"
import { UIProvider } from "./provider"

const App: AppType = ({
    Component,
    pageProps
}) => {
    return (
        <>
            <Head>
                <meta name="description" content="Penguaran - Family Expense Tracker" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-title" content="Penguaran" />
                <link rel="apple-touch-icon-precomposed" type="image/png" sizes="57x57" href="/static/icons/apple-icon-57x57.png" />
                <link rel="apple-touch-icon" type="image/png" sizes="57x57" href="/static/icons/apple-icon-57x57.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/static/icons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/static/icons/favicon-16x16.png" />
                <link rel="shortcut icon" href="/static/icons/favicon.ico" />
                <link rel="manifest" href="/static/manifest.json" />
            </Head>
            <style jsx global>{`
                :root {
                    --joy-fontFamily-body: ${font.style.fontFamily}
                }
            `}</style>
            <UIProvider>
                <Component {...pageProps} />
            </UIProvider>
        </>
    );
}

export default trpc.withTRPC(App)
