import { QueryFunctionContext } from "@tanstack/react-query";
import Api from "utils/api";
import { SourcePayment, SourcePaymentItemsReturn, SourcePaymentItemReturn, } from "types/SourcePayment";

const api = new Api("/api/source-payment")

export const fetchListSumberDana = ({ pageParam = 0 }: QueryFunctionContext<string[], any>): Promise<SourcePaymentItemsReturn & { nextCursor: number }> =>
    api.get(`?cursor=${pageParam}`)

export const fetchSumberDana = (page: number): Promise<SourcePaymentItemsReturn> =>
    api.get(`?page=${page}`)

export const addSumberDana = (payload: Partial<SourcePayment>): SourcePaymentItemReturn =>
    api.post("/", payload)

export const editSumberDana = (payload: Partial<SourcePayment>): SourcePaymentItemReturn  =>
    api.put(`/${payload.id}`, payload)

export const removeSumberDana = (id: number | undefined): SourcePaymentItemReturn =>
    api.delete(`/${id}`)
