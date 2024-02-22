import { router } from "../trpc"
import { categoryRouter } from "./category"
import { expenseRouter } from "./expense"
import { storeRouter } from "./store"
import { dashboardRouter } from "./dashboard"
import { sourcePaymentRouter } from "./sourcePayment"

export const appRouter = router({
    category: categoryRouter,
    store: storeRouter,
    dashboard: dashboardRouter,
    expense: expenseRouter,
    sourcePayment: sourcePaymentRouter,
})

export type AppRouter = typeof appRouter
