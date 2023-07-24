import Api from "@/lib/utils/api"

const api = new Api("/api/dashboard")

export const fetchDashboard = () => {
    return api.get("/")
}
