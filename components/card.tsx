interface CardProps {
    children: React.ReactNode,
    className?: string
}

export function Card({ children }: CardProps) {
    const containerClassName = `
        px-2 py-1 rounded-lg border border-solid border-gray-100
        bg-white drop-shadow-sm
    `

    return (
        <div className={containerClassName}>
            {children}
        </div>
    )
}
