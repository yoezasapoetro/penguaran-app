import { StoreModelSchema } from "db/models"
import { z } from "zod"

export const StoreFormDataSchema = StoreModelSchema.pick({
    name: true,
    type: true,
    address: true
}).extend({
    address: z.optional(z.string())
})

export type StoreType = {
    id?: number
    name: string
    type: string
    address?: string | null
    createdAt: string
    updatedAt: string
}

export type StoreFormData = z.infer<typeof StoreFormDataSchema>
export type StoreItemsReturn = StoreType[]
export type StoreItemReturn = Awaited<StoreType>
export type StoreFormProps = IFormProps<StoreFormData>

