import { twMerge } from "tailwind-merge"

interface CardProps {
    children: React.ReactNode,
    className?: string
}

export function Card({ children, className }: CardProps) {
    const containerClassName = twMerge(`
        px-2 py-1 rounded-lg border border-solid border-gray-100
        bg-white drop-shadow-sm
    `, className)

    return (
        <div className={containerClassName}>
            {children}
        </div>
    )
}
