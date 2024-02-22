import CategoryService from "api/service/CategoryService"
import { protectedProcedure } from "api/server/trpc"

export const categoryProcedure = protectedProcedure.use((opts) => {
    return opts.next({
        ctx: {
            ...opts.ctx,
            categoryService: new CategoryService(opts.ctx.dbConn, opts.ctx.userId)
        }
    })
})
