import { z } from "zod"
import { GetAllSchema, RemoveSchema } from "../schemas";
import { router } from "../trpc";
import { sourcePaymentProcedure } from "../procedures/sourcePayment";
import { SourcePaymentFormSchema } from "types/SourcePayment";

export const sourcePaymentRouter = router({
    getAll: sourcePaymentProcedure
        .input(GetAllSchema)
        .query((opts) => {
            const { ctx, input } = opts
            return ctx.sourcePaymentService.getAllHandler(input.page, input.cursor)
        }),
    create: sourcePaymentProcedure
        .input(SourcePaymentFormSchema)
        .mutation((opts) => {
            const { ctx, input } = opts
            return ctx.sourcePaymentService.createHandler(input)
        }),
    update: sourcePaymentProcedure
        .input(z.object({
            id: z.number(),
            payload: SourcePaymentFormSchema,
        }))
        .mutation((opts) => {
            const { ctx, input } = opts
            return ctx.sourcePaymentService.editHandler(input.id, input.payload)
        }),
    delete: sourcePaymentProcedure
        .input(RemoveSchema)
        .mutation((opts) => {
            const { ctx, input } = opts
            return ctx.sourcePaymentService.removeHandler(input.id)
        }),
})

