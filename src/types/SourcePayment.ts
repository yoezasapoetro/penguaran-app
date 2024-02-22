import { z } from "zod"
import { SourcePaymentModelSchema } from "db/models"

export const SourcePaymentFormSchema = SourcePaymentModelSchema.pick({
    name: true,
    type: true
})

export type SourcePaymentType = {
    id: number
    name: string
    type: string
    createdAt: string
    updatedAt: string
}

export type SourcePaymentFormData = z.infer<typeof SourcePaymentFormSchema>
export type SourcePaymentItemsReturn = SourcePaymentType[]
export type SourcePaymentItemReturn = Awaited<SourcePaymentType>
export type SourcePaymentFormProps = IFormProps<SourcePaymentFormData>
