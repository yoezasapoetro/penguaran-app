import { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/lib/db"
import StoreRepository from "@/repository/StoreRepository"

export default class StoreService {
    private repository: StoreRepository
    private maxFetch = 5

    constructor(userId: string) {
        this.repository = new StoreRepository(db, userId)
    }

    async getAllHandler(res: NextApiResponse) {
        const result = await this.repository.getAll()
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
            console.error('StoreService', err)
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
            console.error('StoreService', err)
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
            console.error('StoreService', err)
            res.status(500).json({
                status: "error",
                message: "Internal server error"
            })
        }
    }
}


