import { desc, between, and, eq } from "drizzle-orm";
import { subDays, addMonths } from "date-fns"

import {
    Expense,
    ExpenseModel,
} from "@/lib/models";
import {
    expense,
    store,
    sourcePayment,
    category,
    expenseDetails,
} from "@/db/schemas/pg";
import AbstractRepository from "./AbstractRepository";

export default class ExpenseRepository extends AbstractRepository {
    private _getBeginDateFromMonth(month: number): Date {
        return new Date(this.currentYear, month - 1, 1)
    }

    private _getEndDateFromMonth(startDate: Date): Date {
        const month = addMonths(startDate, 1)
        return subDays(month, 1)
    }

    async getAllByMonth(month: number, limit: number): Promise<Array<any>> {
        const startDate = this._getBeginDateFromMonth(month)
        const endDate = this._getEndDateFromMonth(startDate)

        const result = await this.client
            .select({
                id: expense.id,
                date: expense.expenseDate,
                storeName: store.name,
                categoryName: category.name,
                sourcePaymentName: sourcePayment.name,
                createdAt: expense.createdAt,
                updatedAt: expense.updatedAt,
            })
            .from(expense)
            .innerJoin(store, eq(store.id, expense.storeId))
            .innerJoin(sourcePayment, eq(sourcePayment.id, expense.sourcePaymentId))
            .innerJoin(category, eq(category.id, expense.categoryId))
            .where(and(
                eq(expense.userId, this.userId),
                between(
                    expense.expenseDate,
                    startDate.toDateString(),
                    endDate.toDateString(),
                )
            ))
            .limit(limit)
            .orderBy(desc(expense.expenseDate))

        return result
    }

    async create(payload: Partial<ExpenseModel>): Promise<Partial<Expense>> {
        const _payload: Omit<ExpenseModel, "id"> = {
            userId: this.userId,
            storeId: payload.storeId as number,
            sourcePaymentId: payload.sourcePaymentId as number,
            categoryId: payload.categoryId as number,
            total: payload.total as string,
            expenseDate: payload.expenseDate as string,
            createdAt: this.getDateString(),
            updatedAt: this.getDateString(),
        }

        const [created] = await this.client
            .insert(expense)
            .values(_payload)
            .returning()

        return created
    }

    async getById(id: number) {
        const [oneExpense] = await this.client
            .select()
            .from(expense)
            .fullJoin(store, eq(store.id, expense.storeId))
            .fullJoin(sourcePayment, eq(sourcePayment.id, expense.sourcePaymentId))
            .fullJoin(category, eq(category.id, expense.categoryId))
            .where(
                eq(expense.id, id)
            )

        return oneExpense
    }

    async delete(id: number) {
        await this.client.transaction(async (tx) => {
            const detailDeleted = await tx
                .delete(expenseDetails)
                .where(eq(expenseDetails.expenseId, id))
                .returning()

            if (detailDeleted) {
                await tx
                    .delete(expense)
                    .where(and(
                        eq(expense.id, id),
                        eq(expense.userId, this.userId),
                    ))
            }
        })
    }
}
