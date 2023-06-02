"use client"
import { DeleteButton } from "@/app/components/button"

export function RemoveCategory({ categoryId, remove }: { categoryId: number, remove: (id: number) => Promise<void> }) {
    return <DeleteButton onClick={async () => {
        await remove(categoryId)
    }} />
}
