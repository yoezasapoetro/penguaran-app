import { IconType } from "react-icons"

export type SumberDana = {
    id: number
    name: string
    type: string
    createdAt: string
    updatedAt: string
}

export type SumberDanaItemsReturn = Promise<{
    data: SumberDana[]
    total: number
}>

export type SumberDanaItemReturn = Promise<{
    data: SumberDana
    status: string
}>

export type SumberDanaFormProps = {
    formData: Partial<SumberDana>
    formMode: string | null
}

export type SumberDanaTypeData = {
    label: string
    labelText: string
    icon: IconType
}
