import { NextApiRequest, NextApiResponse } from "next"
import { dbPg } from "@/lib/db"
import { ExpenseDetailsModel, ExpenseModel } from "@/lib/models"
import ExpenseDetailRepository from "@/repository/ExpenseDetailRepository"
import ExpenseRepository from "@/repository/ExpenseRepository"

type ExpenseDetailPayload = {
    detail: string
    amount: string
}

type ExpensePayload = {
    expenseDate: string
    total: string
    storeId: number
    categoryId: number
    sourcePaymentId: number
    detail: ExpenseDetailPayload[]
}

export default class ExpenseService {
    private expenseRepository: ExpenseRepository
    private expenseDetailRepository: ExpenseDetailRepository
    private maxReach = 10

    constructor(userId: string) {
        this.expenseRepository = new ExpenseRepository(dbPg, userId)
        this.expenseDetailRepository = new ExpenseDetailRepository(dbPg, userId)
    }

    async getAllByMonthHandler(req: NextApiRequest, res: NextApiResponse) {
        let month = Number(req.query.month || "0")

        if (!month) {
            month = this.expenseRepository.currentMonth
        }

        const results = await this.expenseRepository.getAllByMonth(month, this.maxReach)

        return res.status(200).json({
            data: results,
            total: results.length,
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

    async createHandler(req: NextApiRequest, res: NextApiResponse) {
        const { detail, ...expense }: ExpensePayload = req.body
        const expensePayload: Partial<ExpenseModel> = {
            expenseDate: expense.expenseDate,
            total: expense.total,
            storeId: expense.storeId,
            categoryId: expense.categoryId,
            sourcePaymentId: expense.sourcePaymentId,
        }

        const created = await this.expenseRepository.create(expensePayload)

        if (!created) {
            res.status(500).json({ message: "Internal server error" })
            return
        }

        const expenseDetailPayload: Array<Partial<ExpenseDetailsModel>> = detail
            .map((d: ExpenseDetailPayload) => {
                return {
                    expenseId: created.id,
                    detail: d?.detail,
                    amount: d.amount,
                }
            })

        const total = await this.expenseDetailRepository.createMany(expenseDetailPayload)

        res.status(201).json({ message: "Successfully created.", total })
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
