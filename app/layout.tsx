import "@/styles/globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { font } from "@/lib/utils/fonts"
import ClerkOptions from '@/lib/utils/clerkOptions'
import { Providers } from "./providers"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider {...ClerkOptions}>
            <html lang="en">
                <body className={font.className}>
                    <Providers>
                        {children}
                    </Providers>
                </body>
            </html>
        </ClerkProvider>
    )
}
