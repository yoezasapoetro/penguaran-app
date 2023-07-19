import {
    KategoriPengeluaran,
    KategoriPengeluaranItemReturn,
    KategoriPengeluaranItemsReturn
} from "@/types/KategoriPengeluaran"
import Api from "@/lib/utils/api"

const api = new Api("/api/category")

export const fetchCategoryByName = (nameQuery: string): KategoriPengeluaranItemsReturn =>
    api.get(`?q=${nameQuery}`)

export const fetchKategoriPengeluaran = (page: number): KategoriPengeluaranItemsReturn =>
    api.get(`?page=${page}`)

export const addKategoriPengeluaran = (payload: Partial<KategoriPengeluaran>): KategoriPengeluaranItemReturn =>
    api.post(`/`, payload)

export const editKategoriPengeluaran = (payload: Partial<KategoriPengeluaran>): KategoriPengeluaranItemReturn =>
    api.put(`/${payload.id}`, payload)

export const removeKategoriPengeluaran = (id: number | undefined): KategoriPengeluaranItemReturn =>
    api.delete(`/${id}`)

