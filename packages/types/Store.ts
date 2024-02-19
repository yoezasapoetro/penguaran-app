export type Store = {
    id: number
    name: string
    type: string
    address?: string
    createdAt: string
    updatedAt: string
}

export type StoreItemsReturn = IItemsReturn<Store>
export type StoreItemReturn = Awaited<IItemReturn<Store>>
export type StoreFormProps = IFormProps<Store>

