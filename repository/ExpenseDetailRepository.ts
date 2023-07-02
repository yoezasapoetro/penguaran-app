import { eq } from "drizzle-orm";
import { expenseDetails } from "@/db/schemas/pg";
import { ExpenseDetailsModel } from "@/lib/models";
import AbstractRepository from "./AbstractRepository";

export default class ExpenseDetailRepository extends AbstractRepository {
    async getByExpenseId(expenseId: number): Promise<Array<any>> {
        const result = await this.client
            .select()
            .from(expenseDetails)
            .where(eq(expenseDetails.expenseId, expenseId))
        return result
    }

    async createMany(payloads: Array<Partial<ExpenseDetailsModel>>): Promise<number> {
        const self = this
        return await this.client
            .transaction(async (tx) => {
                const returnValues: Array<ExpenseDetailsModel> = []
                for (const payload of payloads) {
                    const _payload: Array<Omit<ExpenseDetailsModel, "id">> = {
                        detail: payload.detail ?? null,
                        amount: payload.amount ?? 0,
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
