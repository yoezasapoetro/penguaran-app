import { z } from "zod"
import { CategoryModelSchema } from "db/models"

export const CategoryFormSchema = CategoryModelSchema.pick({
    name: true,
    priority: true
})

export type CategoryType = {
    id: number
    name: string
    priority: number | null
    createdAt: string
    updatedAt: string
    deletedAt?: string | null
}

export type CategoryFormData = z.infer<typeof CategoryFormSchema>
export type CategoryItemsReturn = CategoryType[]
export type CategoryItemReturn = Awaited<CategoryType>
export type CategoryFormProps = IFormProps<CategoryFormData>

