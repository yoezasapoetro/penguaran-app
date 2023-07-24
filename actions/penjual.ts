import { QueryFunctionContext } from "@tanstack/react-query";
import {
    Penjual,
    PenjualItemsReturn,
    PenjualItemReturn,
} from "@/types/Penjual";
import Api from "@/lib/utils/api";

const api = new Api("/api/store")

export const fetchListPenjual = ({ pageParam = 0 }: QueryFunctionContext<string[], any>): Promise<PenjualItemsReturn & { nextCursor: number }> =>
    api.get(`?cursor=${pageParam}`)

export const fetchPenjual = (page: number): Promise<PenjualItemsReturn> =>
    api.get(`?page=${page}`)

export const addPenjual = (payload: Partial<Penjual>): PenjualItemReturn =>
    api.post("/", payload)

export const editPenjual = (payload: Partial<Penjual>): PenjualItemReturn =>
    api.put(`/${payload.id}`, payload)

export const removePenjual = (id: number | undefined): PenjualItemReturn =>
    api.delete(`/${id}`)

