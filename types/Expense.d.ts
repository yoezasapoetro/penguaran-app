export type ExpenseDetailPayload = {
    detail: string
    amount: number
}

export type ExpenseItem = {
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
    expenses: Array<ExpenseItem>
}>

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
