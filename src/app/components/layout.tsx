import AppMenu from "./menu"

type AppLayoutProps = {
    children: React.ReactNode
    menu?: React.ReactNode
}

export function DefaultLayout({ children, menu }: AppLayoutProps) {
    const className = `
        box-border min-h-full w-full flex flex-col
        bg-gradient-to-t from-stone-100 to-green-50
    `
    return (
        <main className={className}>
            <section className="flex-grow w-full h-full">
                {children}
            </section>
            {menu}
        </main>
    )
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <DefaultLayout menu={<AppMenu />}>
            {children}
        </DefaultLayout>
    )
}

export function AuthLayout({ children }: AppLayoutProps) {
    return (
        <DefaultLayout>
            <div className="flex flex-col items-center justify-center h-screen w-full">
                {children}
            </div>
        </DefaultLayout>
    )
}
