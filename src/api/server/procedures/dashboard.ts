import DashboardService from "api/service/DashboardService"
import { protectedProcedure } from "api/server/trpc"

export const dashboardProcedure = protectedProcedure.use((opts) => {
    return opts.next({
        ctx: {
            ...opts.ctx,
            dashboardService: new DashboardService(opts.ctx.dbConn, opts.ctx.userId)
        }
    })
})

