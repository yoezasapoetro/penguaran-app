import { Html, Head, Main, NextScript } from "next/document";
import { font } from "@/lib/utils/fonts"

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className={font.className}>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
