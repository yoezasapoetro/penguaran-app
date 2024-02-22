import { z } from "zod"
import { GetAllSchema, RemoveSchema } from "../schemas";
import { router } from "../trpc";
import { storeProcedure } from "../procedures/store";
import { StoreFormDataSchema } from "types/Store"

export const storeRouter = router({
    getAll: storeProcedure
        .input(GetAllSchema)
        .query((opts) => {
            const { ctx, input } = opts
            return ctx.storeService.getAllHandler(input.page, input.cursor)
        }),
    create: storeProcedure
        .input(StoreFormDataSchema)
        .mutation((opts) => {
            const { ctx, input } = opts
            return ctx.storeService.createHandler(input)
        }),
    update: storeProcedure
        .input(z.object({
            id: z.number(),
            payload: StoreFormDataSchema,
        }))
        .mutation((opts) => {
            const { ctx, input } = opts
            return ctx.storeService.editHandler(input.id, input.payload)
        }),
    delete: storeProcedure
        .input(RemoveSchema)
        .mutation((opts) => {
            const { ctx, input } = opts
            return ctx.storeService.removeHandler(input.id)
        }),
})
