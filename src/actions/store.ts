import { QueryFunctionContext } from "@tanstack/react-query";
import Api from "utils/api";
import { Store, StoreItemsReturn, StoreItemReturn, } from "types/Store";

const api = new Api("/api/store")

export const fetchListPenjual = ({ pageParam = 0 }: QueryFunctionContext<string[], any>): Promise<StoreItemsReturn & { nextCursor: number }> =>
    api.get(`?cursor=${pageParam}`)

export const fetchPenjual = (page: number): Promise<StoreItemsReturn> =>
    api.get(`?page=${page}`)

export const addPenjual = (payload: Partial<Store>): StoreItemReturn =>
    api.post("/", payload)

export const editPenjual = (payload: Partial<Store>): StoreItemReturn =>
    api.put(`/${payload.id}`, payload)

export const removePenjual = (id: number | undefined): StoreItemReturn =>
    api.delete(`/${id}`)

