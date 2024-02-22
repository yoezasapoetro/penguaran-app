import { z } from "zod"

import { categoryProcedure } from "api/server/procedures/category"
import { router } from "../trpc"
import { GetAllSchema, RemoveSchema } from "../schemas"
import { CategoryFormSchema } from "types/Category"

export const categoryRouter = router({
    getAll: categoryProcedure
        .input(GetAllSchema)
        .query((opts) => {
            const { ctx, input } = opts
            return ctx.categoryService.getAllHandler(input.page, input.cursor)
        }),
    create: categoryProcedure
        .input(CategoryFormSchema)
        .mutation((opts) => {
            const { ctx, input } = opts
            return ctx.categoryService.createHandler(input)
        }),
    update: categoryProcedure
        .input(z.object({
            id: z.number(),
            payload: CategoryFormSchema
        }))
        .mutation((opts) => {
            const { ctx, input } = opts
            return ctx.categoryService.editHandler(input.id, input.payload)
        }),
    delete: categoryProcedure
        .input(RemoveSchema)
        .mutation((opts) => {
            const { ctx, input } = opts
            return ctx.categoryService.removeHandler(input.id, input.forceDelete)
        }),
})
