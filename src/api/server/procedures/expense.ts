import ExpenseService from "api/service/ExpenseService"
import { protectedProcedure } from "api/server/trpc"

export const expenseProcedure = protectedProcedure.use((opts) => {
    return opts.next({
        ctx: {
            ...opts.ctx,
            expenseService: new ExpenseService(opts.ctx.dbConn, opts.ctx.userId)
        }
    })
})

