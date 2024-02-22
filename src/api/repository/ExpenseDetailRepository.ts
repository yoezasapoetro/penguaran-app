import { eq } from "drizzle-orm";

import { expenseDetails } from "db/schemas/pg";
import { ExpenseDetails, ExpenseDetailsModel } from "db/models";
import AbstractRepository from "./AbstractRepository";

export type SingleExpenseDetailPayload = Pick<ExpenseDetailsModel, "expenseId" | "detail" | "amount">[]

export default class ExpenseDetailRepository extends AbstractRepository<ExpenseDetails> {
    async getByExpenseId(expenseId: number): Promise<ExpenseDetailsModel[]> {
        const result = await this.client
            .select()
            .from(expenseDetails)
            .where(eq(expenseDetails.expenseId, expenseId))
        return result
    }

    async createMany(payloads: SingleExpenseDetailPayload): Promise<number> {
        const self = this
        return await this.client
            .transaction(async (tx) => {
                const returnValues: Array<ExpenseDetailsModel> = []
                for (const payload of payloads) {
                    const _payload: ExpenseDetailsModel = {
                        expenseId: payload.expenseId,
                        detail: payload.detail,
                        amount: payload.amount,
                        createdAt: self.getDateString(),
                        updatedAt: self.getDateString(),
                    }
                    const [created] = await tx
                        .insert(expenseDetails)
                        .values(_payload)
                        .returning()

                    returnValues.push(created)
                }

                return returnValues.length
            })
    }
}
