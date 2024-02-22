import { desc, between, and, eq, sql } from "drizzle-orm";
import { subDays, addMonths } from "date-fns"

import { Category, Store, Expense, ExpenseModel, SourcePayment } from "db/models";
import { expense, store, sourcePayment, category, expenseDetails } from "db/schemas/pg";
import { DashboardExpenseItem, DashboardExpenseItems, DashboardExpenseRatioItem } from "types/Dashboard"
import AbstractRepository from "./AbstractRepository";

export type ExpenseItem = Expense & Store & SourcePayment & Category
export type SingleExpensePayload = Omit<ExpenseModel, "createdAt" | "updatedAt" | "deletedAt" | "userId">

export default class ExpenseRepository extends AbstractRepository<Expense> {
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

    async getAllByMonth(month: number, offset: number, limit: number): Promise<DashboardExpenseItems> {
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


    async getTodayExpense(): Promise<DashboardExpenseItem | null> {
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

        return result || null
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

        const expenseOnSourcePayment = this.client
            .select({
                total: expense.total,
                sourcePaymentId: expense.sourcePaymentId,
            })
            .from(expense)
            .where(between(
                expense.expenseDate,
                startDate.toDateString(),
                endDate.toDateString(),
            ))
            .as("esp")

        const results: Array<DashboardExpenseRatioItem> = await this.client
            .select({
                sourceName: sql<string>`${sourcePayment.name}`.as("sourceName"),
                sourceType: sql<string>`${sourcePayment.type}`.as("sourceType"),
                total: sql<string>`SUM(COALESCE(${expenseOnSourcePayment.total}, 0))`,
            })
            .from(sourcePayment)
            .leftJoin(expenseOnSourcePayment, eq(sourcePayment.id, expenseOnSourcePayment.sourcePaymentId))
            .where(
                eq(sourcePayment.userId, this.userId),
            )
            .orderBy(desc(sourcePayment.type))
            .groupBy(sourcePayment.type, sourcePayment.name)

        return results
    }

    async create(payload: SingleExpensePayload): Promise<ExpenseModel> {
        const _payload: ExpenseModel = {
            userId: this.userId,
            storeId: payload.storeId,
            sourcePaymentId: payload.sourcePaymentId,
            categoryId: payload.categoryId,
            total: payload.total,
            expenseDate: payload.expenseDate,
            createdAt: this.getDateString(),
            updatedAt: this.getDateString(),
        }

        const [created] = await this.client
            .insert(expense)
            .values(_payload)
            .returning()

        return created
    }

    async getById(id: number): Promise<any> {
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

    async delete(id: number): Promise<void> {
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
