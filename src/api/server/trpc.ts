import { TRPCError, initTRPC } from "@trpc/server"
import { Context } from "./context"

const t = initTRPC.context<Context>().create()

export const router = t.router
export const procedure = t.procedure
export const protectedProcedure = t.procedure.use((opts) => {
    if (!opts.ctx?.userId) {
        throw new TRPCError({
            code: "UNAUTHORIZED"
        })
    }

    return opts.next({
        ctx: {
            ...opts.ctx,
            userId: opts.ctx.userId
        }
    })
})
