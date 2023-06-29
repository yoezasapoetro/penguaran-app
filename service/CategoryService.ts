import { NextApiRequest, NextApiResponse } from "next"
import { dbPg } from "@/lib/db"
import CategoryRepository from "@/repository/CategoryRepository"

export default class CategoryService {
    private repository: CategoryRepository
    private maxFetch = 10

    constructor(userId: string) {
        this.repository = new CategoryRepository(dbPg, userId)
    }

    async getAllHandler(res: NextApiResponse) {
        const result = await this.repository.getAll(this.maxFetch)
        const chunked = result.splice(0, this.maxFetch)

        return res.status(200).json({
            data: chunked,
            total: chunked.length
        })
    }

    async createHandler(req: NextApiRequest, res: NextApiResponse) {
        try {
            const payload = req.body
            const result = await this.repository.create(payload)
            res.status(200).json({
                status: "ok",
                data: result
            })
        } catch (err) {
            console.error('CategoryService', err)
            res.status(500).json({
                status: "error",
                message: "Internal server error"
            })
        }
    }

    async editHandler(req: NextApiRequest, res: NextApiResponse) {
        try {
            const categoryId = parseInt(req.query.categoryId as string)
            const payload = req.body
            const result = await this.repository.edit(categoryId, payload)
            res.status(200).json({
                status: "ok",
                data: result
            })
        } catch (err) {
            console.error('CategoryService', err)
            res.status(500).json({
                status: "error",
                message: "Internal server error"
            })
        }
    }

    async removeHandler(req: NextApiRequest, res: NextApiResponse) {
        try {
            const categoryId = parseInt(req.query.categoryId as string)
            const isForceDeleted = req.query.forceDelete ? Boolean(req.query.forceDelete as string) : false
            const result = await this.repository.remove(categoryId, isForceDeleted)
            res.status(200).json({
                status: "ok",
                data: result
            })
        } catch (err) {
            console.error('CategoryService', err)
            res.status(500).json({
                status: "error",
                message: "Internal server error"
            })
        }
    }
}
