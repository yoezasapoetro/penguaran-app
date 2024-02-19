interface IFormProps<T> {
    formData: Partial<T>
    formMode: string | null
}

interface IItemReturn<T> {
    data: T
    status: string
}

interface IItemsReturn<T> {
    data: Partial<T>[]
    total: number
    totalPage: number
}
