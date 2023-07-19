import { ExpensePayload } from "@/types/Expense"
import Api from "@/lib/utils/api"

const api = new Api("/api/expense")

export const addExpense = (payload: ExpensePayload) =>
    api.post("/", payload)
