export type ExpenseDetailPayload = {
    detail: string
    amount: number
}

export type ExpensePayload = {
    expenseDate: string
    total: number
    storeId: number
    categoryId: number
    sourcePaymentId: number
    details?: ExpenseDetailPayload[]
}

export type ExpenseReturnItems = Promise<Array<{
    expenseDate: string
    total: string
    storeId: number
    categoryId: number
    sourcePaymentId: number
}>>

export type ExpenseReturnItem = Promise<{
    expenseDate: string
    total: string
    storeId: number
    categoryId: number
    sourcePaymentId: number
    detail: ExpenseDetailPayload[]
}>
