import {
    Penjual,
    PenjualItemsReturn,
    PenjualItemReturn,
} from "@/types/Penjual";
import Api from "@/lib/utils/api";

const api = new Api("/api/store")

export const fetchPenjual = (page: number): PenjualItemsReturn =>
    api.get(`?page=${page}`)

export const addPenjual = (payload: Partial<Penjual>): PenjualItemReturn =>
    api.post("/", payload)

export const editPenjual = (payload: Partial<Penjual>): PenjualItemReturn  =>
    api.put(`/${payload.id}`, payload)

export const removePenjual = (id: number | undefined): PenjualItemReturn =>
    api.delete(`/${id}`)

