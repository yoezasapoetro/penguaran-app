export type Category = {
    id: number
    name: string
    priority: number
    createdAt: string
    updatedAt: string
    deletedAt: string
}

export type CategoryItemsReturn = IItemsReturn<Partial<Category>>
export type CategoryItemReturn = Awaited<IItemReturn<Category>>
export type CategoryFormProps = IFormProps<Category>

