import { z } from "zod"
import { dashboardProcedure } from "../procedures/dashboard";
import { router } from "../trpc";

export const dashboardRouter = router({
    getAllByMonth: dashboardProcedure
        .input(z.object({
            currentPage: z.number(),
            currentMonth: z.number(),
        }))
        .query((opts) => {
            const { ctx, input } = opts
            return ctx.dashboardService.getAllByMonthHandler(input.currentPage, input.currentMonth)
        }),
    analytics: dashboardProcedure
        .query((opts) => {
            const { ctx } = opts
            return ctx.dashboardService.getDashboardAnalytics()
        })
})

