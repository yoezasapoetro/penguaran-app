import { NeonDatabase } from "drizzle-orm/neon-serverless"
import { Expense, ExpenseDetails } from "db/models"
import { ExpenseDetailPayload, ExpensePayload } from "types/Expense"

import ExpenseDetailRepository, { SingleExpenseDetailPayload } from "api/repository/ExpenseDetailRepository"
import ExpenseRepository, { SingleExpensePayload } from "api/repository/ExpenseRepository"

export default class ExpenseService {
    private expenseRepository: ExpenseRepository
    private expenseDetailRepository: ExpenseDetailRepository

    constructor(db: NeonDatabase<ExpenseDetails | Expense>, userId: string) {
        this.expenseRepository = new ExpenseRepository(db, userId)
        this.expenseDetailRepository = new ExpenseDetailRepository(db, userId)
    }

    async getAllByExpenseIdHandler(expenseId: number) {
        const results = await this.expenseDetailRepository.getByExpenseId(expenseId)

        return {
            data: results,
            total: results.length
        }
    }

    async createHandler({ details, ...expense }: ExpensePayload) {
        try {
            const expensePayload: SingleExpensePayload = {
                expenseDate: expense.expenseDate,
                total: expense.total,
                storeId: expense.storeId,
                categoryId: expense.categoryId,
                sourcePaymentId: expense.sourcePaymentId,
            }

            const created = await this.expenseRepository.create(expensePayload)

            if (details && !details.length) {
                const expenseDetailPayload: SingleExpenseDetailPayload = details
                    .reduce((ep: SingleExpenseDetailPayload, d: ExpenseDetailPayload) => {
                        if (created.id) {
                            ep.push({
                                expenseId: created.id,
                                detail: d.detail,
                                amount: d.amount.toString(),
                            })
                        }
                        return ep
                    }, [])

                await this.expenseDetailRepository.createMany(expenseDetailPayload)
            }

            return { message: "Successfully created." }
        } catch (err) {
            console.error(err)
            throw { message: "Internal server error" }
        }
    }

    async deleteHandler(expenseId: number) {
        await this.expenseRepository.delete(expenseId)

        return { message: "Successfully removed" }
    }
}
