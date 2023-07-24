import { desc, between, and, eq, sql } from "drizzle-orm";
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
import {
    ExpenseItem,
    DashboardExpenseItem,
    DashboardExpenseItems,
    DashboardExpenseRatioItem,
} from "@/types/Expense";

export default class ExpenseRepository extends AbstractRepository {
    private _getBeginDateFromMonth(month: number): Date {
        return new Date(this.currentYear, month - 1, 1)
    }

    private _getEndDateFromMonth(startDate: Date): Date {
        const month = addMonths(startDate, 1)
        return subDays(month, 1)
    }

    private sqlQuery(startDate: Date, endDate: Date) {
        return this.client
            .$with("sqlQuery")
            .as(
                this.client
                    .select({
                        id: expense.id,
                        date: expense.expenseDate,
                        total: expense.total,
                        storeName: sql<string>`${store.name}`.as("storeName"),
                        categoryName: sql<string>`${category.name}`.as("categoryName"),
                        sourcePaymentName: sql<string>`${sourcePayment.name}`.as("sourcePaymentName"),
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
                    .orderBy(desc(expense.expenseDate))
            )
    }

    selectAllExpense(month: number) {
        const startDate = this._getBeginDateFromMonth(month)
        const endDate = this._getEndDateFromMonth(startDate)

        return this.sqlQuery(startDate, endDate)
    }

    async getAllByMonth(month: number, offset: number, limit: number): Promise<Array<any>> {
        const query = this.selectAllExpense(month)

        const result = await this.client
            .with(query)
            .select()
            .from(query)
            .offset(offset)
            .limit(limit)

        return result
    }

    async countAllByMonth(month: number): Promise<number> {
        const query = this.selectAllExpense(month)

        const [{ count }]: Array<{ count: number }> = await this.client
            .with(query)
            .select({
                count: sql<number>`count(*)`
            })
            .from(query)

        return count
    }


    async getTodayExpense(): Promise<DashboardExpenseItem> {
        const today = this.currentDate.toDateString()

        const [result]: Array<DashboardExpenseItem> = await this.client
            .select({
                total: expense.total,
                storeName: sql<string>`${store.name}`.as("storeName"),
                categoryName: sql<string>`${category.name}`.as("categoryName"),
                sourcePaymentName: sql<string>`${sourcePayment.name}`.as("sourcePaymentName"),
            })
            .from(expense)
            .innerJoin(store, eq(store.id, expense.storeId))
            .innerJoin(sourcePayment, eq(sourcePayment.id, expense.sourcePaymentId))
            .innerJoin(category, eq(category.id, expense.categoryId))
            .where(and(
                eq(expense.userId, this.userId),
                eq(expense.expenseDate, today)
            ))
            .orderBy(
                desc(expense.expenseDate),
                desc(expense.id)
            )
            .limit(1)

        return result
    }

    async getThisMonthExpense(): Promise<DashboardExpenseItems> {
        const startDate = this._getBeginDateFromMonth(this.currentMonth)
        const endDate = this._getEndDateFromMonth(startDate)

        const result: DashboardExpenseItems = await this.client
            .select({
                total: expense.total,
                storeName: sql<string>`${store.name}`.as("storeName"),
                categoryName: sql<string>`${category.name}`.as("categoryName"),
                sourcePaymentName: sql<string>`${sourcePayment.name}`.as("sourcePaymentName"),
            })
            .from(expense)
            .innerJoin(category, eq(category.id, expense.categoryId))
            .innerJoin(store, eq(store.id, expense.storeId))
            .innerJoin(sourcePayment, eq(sourcePayment.id, expense.sourcePaymentId))
            .where(and(
                eq(expense.userId, this.userId),
                between(
                    expense.expenseDate,
                    startDate.toDateString(),
                    endDate.toDateString(),
                )
            ))
            .orderBy(
                desc(expense.expenseDate),
                desc(category.priority)
            )
            .limit(3)

        return result
    }

    async getExpenseRatio(): Promise<Array<DashboardExpenseRatioItem>> {
        const startDate = this._getBeginDateFromMonth(this.currentMonth)
        const endDate = this._getEndDateFromMonth(startDate)

        const results: Array<{ sourcePaymentName: string, total: string }> = await this.client
            .select({
                sourcePaymentName: sql<string>`${sourcePayment.name}`.as("sourcePaymentName"),
                total: sql<string>`sum(${expense.total})`,
            })
            .from(sourcePayment)
            .leftJoin(expense, eq(sourcePayment.id, expense.sourcePaymentId))
            .where(and(
                eq(expense.userId, this.userId),
                between(
                    expense.expenseDate,
                    startDate.toDateString(),
                    endDate.toDateString(),
                )
            ))
            .groupBy(sourcePayment.name)

        return results
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

    // dashboard stuff
    async getTodayExpenses() {

    }
}
