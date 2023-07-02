export type KategoriPengeluaran = {
    id: number
    name: string
    priority: number
    createdAt: string
    updatedAt: string
    deletedAt: string
}

export type KategoriPengeluaranFormProps = {
    formData: Partial<KategoriPengeluaran>
    formMode: string | null
}

export type KategoriPengeluaranData = {
    label: string
    group: string
}

export type PrioritasPengeluaranData = {
    label: number
    labelText: string
    icon: IconType
    iconColor: string
}

export type KategoriPengeluaranItemsReturn = Promise<{
    data: KategoriPengeluaran[]
    total: number
}>

export type KategoriPengeluaranItemReturn = Promise<{
    data: KategoriPengeluaran
    status: string
}>

