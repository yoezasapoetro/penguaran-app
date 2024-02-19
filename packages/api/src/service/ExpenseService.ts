import { NextApiRequest, NextApiResponse } from "next"
import { dbPg } from "db/db"
import { ExpenseDetailsModel, ExpenseModel } from "db/models"
import { DashboardAnalytics, ExpenseDetailPayload, ExpensePayload, ExpenseResults } from "types/Expense"

import ExpenseDetailRepository from "~api/repository/ExpenseDetailRepository"
import ExpenseRepository from "~api/repository/ExpenseRepository"

export default class ExpenseService {
    private expenseRepository: ExpenseRepository
    private expenseDetailRepository: ExpenseDetailRepository
    private maxFetch = 10

    constructor(userId: string) {
        this.expenseRepository = new ExpenseRepository(dbPg, userId)
        this.expenseDetailRepository = new ExpenseDetailRepository(dbPg, userId)
    }

    mappingResults(results: Array<any>): ExpenseResults {
        let groups: ExpenseResults = []
        let groupResults: Record<string, Array<any>> = {}

        for (const result of results) {
            if (groupResults[result.date]) {
                groupResults[result.date].push({
                    id: result.id,
                    storeName: result.storeName,
                    sourcePaymentName: result.sourcePaymentName,
                    categoryName: result.categoryName,
                    total: result.total,
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt,
                })
            } else {
                groupResults[result.date] = [{
                    id: result.id,
                    storeName: result.storeName,
                    sourcePaymentName: result.sourcePaymentName,
                    categoryName: result.categoryName,
                    total: result.total,
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt,
                }]
            }
        }

        for (const [key, value] of Object.entries(groupResults)) {
            groups.push({
                dateGroup: key,
                expenses: value,
            })
        }

        return groups;
    }

    async getAllByMonthHandler(req: NextApiRequest, res: NextApiResponse) {
        let result: Array<Partial<ExpenseModel>> = []
        let month = Number(req.query.month || "0")
        const { page = "1" } = req.query

        if (!month) {
            month = this.expenseRepository.currentMonth
        }

        const currentPage = Number(page)

        if (currentPage < 0) result = []

        const offset = (currentPage - 1) * this.maxFetch

        const results = await this.expenseRepository.getAllByMonth(month, offset, this.maxFetch)
        const total = await this.expenseRepository.countAllByMonth(month)

        const groupResults = this.mappingResults(results)

        return res.status(200).json({
            data: groupResults,
            total,
        })
    }

    async getAllByExpenseIdHandler(req: NextApiRequest, res: NextApiResponse) {
        let expenseId = Number(req.query.expenseId || "0")

        if (!expenseId) {
            res.status(403).json({ message: "No data with null expenseId" })
            return
        }

        const results = await this.expenseDetailRepository
            .getByExpenseId(expenseId)

        return res.status(200).json({
            data: results,
            total: results.length
        })
    }

    async getDashboardAnalytics(req: NextApiRequest, res: NextApiResponse) {
        const todayExpense = await this.expenseRepository.getTodayExpense()
        const thisMonthExpense = await this.expenseRepository.getThisMonthExpense()
        const expenseRatio = await this.expenseRepository.getExpenseRatio()

        const dashboardAnalytics: DashboardAnalytics = {
            todayExpense,
            thisMonthExpense,
            expenseRatio,
        }

        return res.status(200).json({
            data: dashboardAnalytics
        })
    }

    async createHandler(req: NextApiRequest, res: NextApiResponse) {
        const { details, ...expense }: ExpensePayload = req.body
        const expensePayload: Partial<ExpenseModel> = {
            expenseDate: expense.expenseDate,
            total: expense.total.toString(),
            storeId: expense.storeId,
            categoryId: expense.categoryId,
            sourcePaymentId: expense.sourcePaymentId,
        }

        const created = await this.expenseRepository.create(expensePayload)

        if (!created) {
            res.status(500).json({ message: "Internal server error" })
            return
        }

        if (details && details.length) {
            const expenseDetailPayload: Array<Partial<ExpenseDetailsModel>> = details
                .map((d: ExpenseDetailPayload) => {
                    return {
                        expenseId: created.id,
                        detail: d.detail,
                        amount: d.amount.toString(),
                    }
                })

            await this.expenseDetailRepository.createMany(expenseDetailPayload)
        }


        res.status(201).json({ message: "Successfully created." })
    }

    async deleteHandler(req: NextApiRequest, res: NextApiResponse) {
        const expenseId = Number(req.query.expenseId || "0")

        if (!expenseId) {
            res.status(403).json({ message: "No expenseId provided" })
            return
        }

        await this.expenseRepository.delete(expenseId)

        return res.status(201).json({ message: "Successfully removed" })
    }
}
