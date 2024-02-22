import { ExpenseGroupItem } from "./Expense"

export type DashboardExpenseItem = Omit<ExpenseGroupItem, "id" | "createdAt" | "updatedAt">
export type DashboardExpenseItems = Array<DashboardExpenseItem>
export type DashboardExpenseRatioItem = {
    sourceName: string
    sourceType: string
    total: string
}

export type DashboardAnalytics = {
    todayExpense: DashboardExpenseItem | null,
    thisMonthExpense: DashboardExpenseItems,
    expenseRatio: Array<DashboardExpenseRatioItem>
}

