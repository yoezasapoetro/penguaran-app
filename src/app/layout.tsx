import './globals.css'
import DefaultLayout from '@/app/components/layout'
import { font } from './font'

export const metadata = {
    title: 'Penguaran',
    description: 'Aplikasi pengelola pengeluaran keluarga',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${font.variable} font-sans box-border h-screen text-green-900`}>
                <DefaultLayout>
                    {children}
                </DefaultLayout>
            </body>
        </html>
    )
}
