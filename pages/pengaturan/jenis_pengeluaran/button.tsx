export function RemoveCategory({ categoryId, remove }: { categoryId: number, remove: (id: number) => Promise<void> }) {
    return <button onClick={async () => {
        await remove(categoryId)
    }} />
}
