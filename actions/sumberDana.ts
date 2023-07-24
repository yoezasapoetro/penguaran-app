import { QueryFunctionContext } from "@tanstack/react-query";
import {
    SumberDana,
    SumberDanaItemsReturn,
    SumberDanaItemReturn,
} from "@/types/SumberDana";
import Api from "@/lib/utils/api";

const api = new Api("/api/source-payment")

export const fetchListSumberDana = ({ pageParam = 0 }: QueryFunctionContext<string[], any>): Promise<SumberDanaItemsReturn & { nextCursor: number }> =>
    api.get(`?cursor=${pageParam}`)

export const fetchSumberDana = (page: number): Promise<SumberDanaItemsReturn> =>
    api.get(`?page=${page}`)

export const addSumberDana = (payload: Partial<SumberDana>): SumberDanaItemReturn =>
    api.post("/", payload)

export const editSumberDana = (payload: Partial<SumberDana>): SumberDanaItemReturn  =>
    api.put(`/${payload.id}`, payload)

export const removeSumberDana = (id: number | undefined): SumberDanaItemReturn =>
    api.delete(`/${id}`)
