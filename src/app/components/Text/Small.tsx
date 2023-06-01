import { twMerge } from "tailwind-merge"

export default function TextSmall({ children, className }: {
    children: React.ReactNode, className?: string
}) {
    const textClassName = twMerge("text-sm", className)
    return <p className={textClassName}>{children}</p>
}
