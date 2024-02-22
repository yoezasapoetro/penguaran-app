import { ExpenseFormDataSchema } from "types/Expense";
import { expenseProcedure } from "../procedures/expense";
import { RemoveSchema } from "../schemas";
import { router } from "../trpc";

export const expenseRouter = router({
    create: expenseProcedure
        .input(ExpenseFormDataSchema)
        .mutation((opts) => {
            const { ctx, input } = opts
            return ctx.expenseService.createHandler(input)
        }),
    delete: expenseProcedure
        .input(RemoveSchema)
        .mutation((opts) => {
            const { ctx, input } = opts
            return ctx.expenseService.deleteHandler(input.id)
        })
})
