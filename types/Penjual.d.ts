export type Penjual = {
    id: number
    name: string
    type: string
    address?: string
    createdAt: string
    updatedAt: string
}

export type PenjualItemsReturn = Promise<{
    data: Penjual[]
    total: number
}>

export type PenjualItemReturn = Promise<{
    data: Penjual
    status: string
}>

export type PenjualFormProps = {
    formData: Partial<Penjual>
    formMode: string | null
}

export type PenjualTypeData = {
    label: string
    group: string
}

