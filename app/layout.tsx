import "@/styles/globals.css"
import { font } from "@/lib/utils/fonts"
import { Providers } from "./providers"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={font.className}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
