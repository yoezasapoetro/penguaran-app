import { NeonDatabase } from "drizzle-orm/neon-serverless"
import { Expense, ExpenseDetails, ExpenseModel } from "db/models"
import { ExpenseResults, ExpenseGroupItem } from "types/Expense"
import { DashboardAnalytics } from "types/Dashboard"

// import ExpenseDetailRepository from "api/repository/ExpenseDetailRepository"
import ExpenseRepository from "api/repository/ExpenseRepository"

export default class DashboardService {
    private expenseRepository: ExpenseRepository
    // private expenseDetailRepository: ExpenseDetailRepository
    private maxFetch = 10

    constructor(db: NeonDatabase<ExpenseDetails | Expense>, userId: string) {
        this.expenseRepository = new ExpenseRepository(db, userId)
        // this.expenseDetailRepository = new ExpenseDetailRepository(db, userId)
    }

    mappingResults(results: Array<any>): ExpenseResults {
        let groups: ExpenseResults = []
        let groupResults: Record<string, ExpenseGroupItem[]> = {}

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

    async getAllByMonthHandler(currentPage: number = 1, currentMonth: number = 0) {
        let result: Array<Partial<ExpenseModel>> = []
        let month = currentMonth
        if (month == 0) month = this.expenseRepository.currentMonth

        if (currentPage < 0) result = []

        const offset = (currentPage - 1) * this.maxFetch

        const results = await this.expenseRepository.getAllByMonth(month, offset, this.maxFetch)
        const total = await this.expenseRepository.countAllByMonth(month)

        const groupResults = this.mappingResults(results)

        return {
            data: groupResults,
            total,
        }
    }

    async getDashboardAnalytics() {
        const todayExpense = await this.expenseRepository.getTodayExpense()
        const thisMonthExpense = await this.expenseRepository.getThisMonthExpense()
        const expenseRatio = await this.expenseRepository.getExpenseRatio()

        const dashboardAnalytics: DashboardAnalytics = {
            todayExpense,
            thisMonthExpense,
            expenseRatio,
        }

        return {
            data: dashboardAnalytics
        }
    }
}
