import {
    KategoriPengeluaran,
    KategoriPengeluaranItemReturn,
    KategoriPengeluaranItemsReturn
} from "@/types/KategoriPengeluaran"
import Api from "@/lib/utils/api"

const api = new Api("/api/category")

export const fetchKategoriPengeluaran = (): KategoriPengeluaranItemsReturn =>
    api.get("/")

export const addKategoriPengeluaran = (payload: Partial<KategoriPengeluaran>): KategoriPengeluaranItemReturn =>
    api.post(`/${payload.id}`, payload)

export const editKategoriPengeluaran = (payload: Partial<KategoriPengeluaran>): KategoriPengeluaranItemReturn =>
    api.put(`/${payload.id}`, payload)

export const removeKategoriPengeluaran = (id: number | undefined): KategoriPengeluaranItemReturn =>
    api.delete(`/${id}`)

