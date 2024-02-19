import { QueryFunctionContext } from "@tanstack/react-query"
import Api from "utils/api"
import { Category, CategoryItemReturn, CategoryItemsReturn } from "types/Category"

const api = new Api("/api/category")

export const fetchListKategoriPengeluaran = ({ pageParam = 0 }: QueryFunctionContext<string[], any>): Awaited<CategoryItemsReturn & { nextCursor: number }> =>
    api.get(`?cursor=${pageParam}`)

export const fetchKategoriPengeluaran = (page: number): Promise<CategoryItemsReturn> =>
    api.get(`?page=${page}`)

export const addKategoriPengeluaran = (payload: Partial<Category>): CategoryItemReturn =>
    api.post(`/`, payload)

export const editKategoriPengeluaran = (payload: Partial<Category>): CategoryItemReturn =>
    api.put(`/${payload.id}`, payload)

export const removeKategoriPengeluaran = (id: number | undefined): CategoryItemReturn =>
    api.delete(`/${id}`)

