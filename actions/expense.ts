import { ExpensePayload } from "@/types/Expense"
import Api from "@/lib/utils/api"

const api = new Api("/api/expense")

export const fetchExpense = (month: number, page: number) =>
    api.get(`?month=${month + 1}&page=${page}`)

export const addExpense = (payload: ExpensePayload) =>
    api.post("/", payload)
