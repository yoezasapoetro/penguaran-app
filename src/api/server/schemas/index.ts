import { z } from "zod"

export const GetAllSchema = z.object({
    page: z.number().default(1),
    cursor: z.number().default(0)
})

export const RemoveSchema = z.object({
    id: z.number(),
    forceDelete: z.boolean().default(false)
})

export const ErrorResponseSchema = z.object({
    status: z.string(),
    message: z.string()
})

export const SuccessResponseSchema = z.object({
    status: z.string(),
    data: z.record(z.unknown())
})

export type ErrorResponseType = z.infer<typeof ErrorResponseSchema>
export type SuccessResponseType = z.infer<typeof SuccessResponseSchema>

