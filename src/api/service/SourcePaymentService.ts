import { NeonDatabase } from "drizzle-orm/neon-serverless"
import { SourcePayment } from "db/models"

import SourcePaymentRepository from "api/repository/SourcePaymentRepository"
import { SourcePaymentFormData, SourcePaymentItemsReturn } from "types/SourcePayment"

export default class SourcePaymentService {
    private repository: SourcePaymentRepository
    private maxFetch = 10

    constructor(db: NeonDatabase<SourcePayment>, userId: string) {
        this.repository = new SourcePaymentRepository(db, userId)
    }

    async getAllHandler(currentPage: number, cursor: number) {
        let result: SourcePaymentItemsReturn = []
        let offset = this.maxFetch

        const isInfinite = cursor >= 0

        let nextCursor = 0

        if (isInfinite) {
            offset = cursor
            nextCursor = offset
        } else {
            offset = (currentPage - 1) * this.maxFetch
        }

        const total = await this.repository.countAll()
        const totalPage = Math.ceil(total / this.maxFetch)
        const inRange = (currentPage >= 1) && (currentPage <= totalPage)

        if (inRange || isInfinite) {
            result = await this.repository.getAll(offset, this.maxFetch)
        }

        if (nextCursor + this.maxFetch <= total) {
            nextCursor = nextCursor + this.maxFetch
        } else if (nextCursor + this.maxFetch > total) {
            nextCursor = total
        }

        return {
            data: result,
            total: total,
            totalPage,
            ...(isInfinite && nextCursor !== total ? {
                nextCursor: nextCursor,
            }: {})
        }
    }

    async createHandler(payload: SourcePaymentFormData) {
        try {
            const result = await this.repository.create(payload)
            return {
                status: "ok",
                data: result
            }
        } catch (err) {
            console.error('SourcePaymentService', err)
            throw {
                status: "error",
                message: "Internal server error"
            }
        }
    }

    async editHandler(sourcePaymentId: number, payload: SourcePaymentFormData) {
        try {
            const result = await this.repository.edit(sourcePaymentId, payload)
            return {
                status: "ok",
                data: result
            }
        } catch (err) {
            console.error('SourcePaymentService', err)
            throw {
                status: "error",
                message: "Internal server error"
            }
        }
    }

    async removeHandler(sourcePaymentId: number, forceDelete: boolean = false) {
        try {
            const result = await this.repository.remove(sourcePaymentId, forceDelete)
            return {
                status: "ok",
                data: result
            }
        } catch (err) {
            console.error('SourcePaymentService', err)
            throw {
                status: "error",
                message: "Internal server error"
            }
        }
    }
}

