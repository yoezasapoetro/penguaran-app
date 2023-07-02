import {
    SumberDana,
    SumberDanaItemsReturn,
    SumberDanaItemReturn,
} from "@/types/SumberDana";
import Api from "@/lib/utils/api";

const api = new Api("/api/source-payment")

export const fetchSumberDana = (): SumberDanaItemsReturn =>
    api.get("/")

export const addSumberDana = (payload: Partial<SumberDana>): SumberDanaItemReturn =>
    api.post("/", payload)

export const editSumberDana = (payload: Partial<SumberDana>): SumberDanaItemReturn  =>
    api.put(`/${payload.id}`, payload)

export const removeSumberDana = (id: number | undefined): SumberDanaItemReturn =>
    api.delete(`/${id}`)
