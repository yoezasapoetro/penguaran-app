interface IFormProps<T> {
    formData: T
    formMode: string | null
}

interface IItemReturn<T> {
    data: T
    status: string
}

interface IItemsReturn<T> {
    data: T[]
    total: number
    totalPage: number
}
