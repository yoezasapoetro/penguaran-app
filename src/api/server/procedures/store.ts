import StoreService from "api/service/StoreService";
import { protectedProcedure } from "../trpc";

export const storeProcedure = protectedProcedure.use((opts) => {
    return opts.next({
        ctx: {
            ...opts.ctx,
            storeService: new StoreService(opts.ctx.dbConn, opts.ctx.userId)
        }
    })
})
