import Api from "utils/api"
import { ExpensePayload } from "types/Expense"

const api = new Api("/api/expense")

export const fetchExpense = (month: number, page: number) =>
    api.get(`?month=${month + 1}&page=${page}`)

export const addExpense = (payload: ExpensePayload) =>
    api.post("/", payload)
