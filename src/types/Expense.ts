import { z } from "zod"
import { ExpenseDetailsSchema, ExpenseModelSchema } from "db/models"

export const ExpenseDetailsFormSchema = ExpenseDetailsSchema.pick({
    detail: true,
    amount: true
})

export const ExpenseFormDataSchema = ExpenseModelSchema.extend({
    details: z.optional(z.array(ExpenseDetailsFormSchema))
}).pick({
    expenseDate: true,
    total: true,
    storeId: true,
    categoryId: true,
    sourcePaymentId: true,
    details: true
})

export type ExpenseGroupItem = {
    id: number
    total: string
    storeName: string
    categoryName: string
    sourcePaymentName: string
    createdAt: string
    updatedAt: string
}

export type ExpenseResults = Array<{
    dateGroup: string
    expenses: ExpenseGroupItem[]
}>

export type ExpensePayload = z.infer<typeof ExpenseFormDataSchema>
export type ExpenseDetailPayload = z.infer<typeof ExpenseDetailsFormSchema>
export type ExpenseReturnItems = Awaited<Array<Omit<ExpensePayload, "details">>>
export type ExpenseReturnItem = Awaited<ExpensePayload>
