import AppMenu from "./menu"

type AppLayoutProps = {
    children: React.ReactNode
}

export default function DefaultLayout({ children }: AppLayoutProps) {
    const className = `
        box-border min-h-full w-full flex flex-col
        bg-gradient-to-t from-stone-100 to-green-50
    `
    return (
        <main className={className}>
            <section className="flex-grow w-full h-full">
                {children}
            </section>
            <AppMenu />
        </main>
    )
}
