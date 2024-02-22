import { NeonDatabase } from "drizzle-orm/neon-serverless"
import { Store } from "db/models"

import StoreRepository from "api/repository/StoreRepository"
import { ErrorResponseType, SuccessResponseType } from "../server/schemas"
import { StoreItemsReturn, StoreFormData } from "types/Store"

export default class StoreService {
    private repository: StoreRepository
    private maxFetch = 5

    constructor(db: NeonDatabase<Store>, userId: string) {
        this.repository = new StoreRepository(db, userId)
    }

    async getAllHandler(currentPage: number, cursor: number) {
        let result: StoreItemsReturn = []
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

    async createHandler(payload: StoreFormData): Promise<SuccessResponseType | ErrorResponseType> {
        try {
            const result = await this.repository.create(payload)
            return {
                status: "ok",
                data: result
            }
        } catch (err) {
            console.error('StoreService', err)
            throw {
                status: "error",
                message: "Internal server error"
            }
        }
    }

    async editHandler(storeId: number, payload: StoreFormData): Promise<SuccessResponseType | ErrorResponseType> {
        try {
            const result = await this.repository.edit(storeId, payload)
            return {
                status: "ok",
                data: result
            }
        } catch (err) {
            console.error('StoreService', err)
            throw {
                status: "error",
                message: "Internal server error"
            }
        }
    }

    async removeHandler(storeId: number, forceDelete: boolean = false): Promise<SuccessResponseType | ErrorResponseType> {
        try {
            const result = await this.repository.remove(storeId, forceDelete)
            return {
                status: "ok",
                data: result
            }
        } catch (err) {
            console.error('StoreService', err)
            throw {
                status: "error",
                message: "Internal server error"
            }
        }
    }
}


