type AppHeaderProps = {
    title: string
    subtitle: string
}

export default function AppHeader({ title, subtitle = "" }: AppHeaderProps) {
    const containerClassName = `
        flex items-center justify-between
        px-5 py-3 bg-white drop-shadow-sm rounded-b-2xl
        border-b border-gray-200
        sticky top-0 left-0 right-0 z-10
    `
    return (
        <header className={containerClassName}>
            <div className="flex flex-col">
                <h3 className="text-xl font-semibold">{title}</h3>
                {subtitle && <p className="leading-none">{subtitle}</p>}
            </div>
        </header >
    )
}

