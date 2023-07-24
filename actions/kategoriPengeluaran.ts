import { QueryFunctionContext } from "@tanstack/react-query"
import {
    KategoriPengeluaran,
    KategoriPengeluaranItemReturn,
    KategoriPengeluaranItemsReturn
} from "@/types/KategoriPengeluaran"
import Api from "@/lib/utils/api"

const api = new Api("/api/category")

export const fetchListKategoriPengeluaran = ({ pageParam = 0 }: QueryFunctionContext<string[], any>): Promise<KategoriPengeluaranItemsReturn & { nextCursor: number }> =>
    api.get(`?cursor=${pageParam}`)

export const fetchKategoriPengeluaran = (page: number): Promise<KategoriPengeluaranItemsReturn> =>
    api.get(`?page=${page}`)

export const addKategoriPengeluaran = (payload: Partial<KategoriPengeluaran>): KategoriPengeluaranItemReturn =>
    api.post(`/`, payload)

export const editKategoriPengeluaran = (payload: Partial<KategoriPengeluaran>): KategoriPengeluaranItemReturn =>
    api.put(`/${payload.id}`, payload)

export const removeKategoriPengeluaran = (id: number | undefined): KategoriPengeluaranItemReturn =>
    api.delete(`/${id}`)

