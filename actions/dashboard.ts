import Api from "@/lib/utils/api"
import { DashboardAnalytics } from "@/types/Expense"

const api = new Api("/api/dashboard")

export const fetchDashboard = (): Promise<{ data: DashboardAnalytics }> => {
    return api.get("/")
}
