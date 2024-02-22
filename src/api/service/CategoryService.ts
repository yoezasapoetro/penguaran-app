import { NeonDatabase } from "drizzle-orm/neon-serverless"
import { Category } from "db/models"
import { CategoryFormData, CategoryItemsReturn } from "types/Category"

import CategoryRepository from "api/repository/CategoryRepository"

export default class CategoryService {
    private repository: CategoryRepository
    private maxFetch = 10

    constructor(db: NeonDatabase<Category>, userId: string) {
        this.repository = new CategoryRepository(db, userId)
    }

    async getAllHandler(currentPage: number, cursor: number) {
        let result: CategoryItemsReturn = []
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

    async createHandler(payload: CategoryFormData) {
        try {
            const result = await this.repository.create(payload)
            return {
                status: "ok",
                data: result
            }
        } catch (err) {
            throw {
                status: "error",
                message: "Internal server error",
            }
        }
    }

    async editHandler(categoryId: number, payload: CategoryFormData) {
        try {
            const result = await this.repository.edit(categoryId, payload)
            return {
                status: "ok",
                data: result
            }
        } catch (err) {
            console.error('CategoryService', err)
            return {
                status: "error",
                message: "Internal server error"
            }
        }
    }

    async removeHandler(categoryId: number, forceDelete: boolean = false) {
        try {
            const result = await this.repository.remove(categoryId, forceDelete)
            return {
                status: "ok",
                data: result
            }
        } catch (err) {
            console.error('CategoryService', err)
            return {
                status: "error",
                message: "Internal server error"
            }
        }
    }
}
