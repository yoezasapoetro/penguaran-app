import SourcePaymentService from "api/service/SourcePaymentService";
import { protectedProcedure } from "../trpc";

export const sourcePaymentProcedure = protectedProcedure.use((opts) => {
    return opts.next({
        ctx: {
            ...opts.ctx,
            sourcePaymentService: new SourcePaymentService(opts.ctx.dbConn, opts.ctx.userId)
        }
    })
})

