import "./globals.css"
import { currentUser } from "@clerk/nextjs"
import { ClerkProvider } from "@clerk/nextjs"
import { AppLayout, AuthLayout } from "@/app/components/layout"
import { font } from "./font"
import ClerkOptions from './clerkOptions'

export const metadata = {
    title: "Penguaran",
    description: "Aplikasi pengelola pengeluaran keluarga"
}

type MainLayoutProps = {
    children: React.ReactNode
    modal: React.ReactNode
}

export default async function RootLayout(props: MainLayoutProps) {
    const user = await currentUser()
    return (
        <ClerkProvider {...ClerkOptions}>
            <html lang="en">
                <body className={`${font.variable} font-sans box-border h-screen text-green-900`}>
                {!!user
                    ? <AppLayout>{props.children}{props.modal}</AppLayout>
                    : <AuthLayout>{props.children}</AuthLayout>}
                </body>
            </html>
        </ClerkProvider>
    )
}
