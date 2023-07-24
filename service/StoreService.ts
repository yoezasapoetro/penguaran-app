import { NextApiRequest, NextApiResponse } from "next"
import { dbPg } from "@/lib/db"
import StoreRepository from "@/repository/StoreRepository"
import { Store } from "@/lib/models"

export default class StoreService {
    private repository: StoreRepository
    private maxFetch = 5

    constructor(userId: string) {
        this.repository = new StoreRepository(dbPg, userId)
    }

    async getAllHandler(req: NextApiRequest, res: NextApiResponse) {
        let result: Array<Partial<Store>> = []
        const { page = "1" } = req.query
        const { cursor } = req.query
        let offset = this.maxFetch

        const isInfinite = cursor && Number(cursor) >= 0
        const currentPage = Number(page)

        let nextCursor = 0

        if (isInfinite) {
            offset = Number(cursor)
            nextCursor = offset
        } else {
            offset = (currentPage - 1) * this.maxFetch
        }

        const total = await this.repository.countAll()
        const totalPage = Math.ceil(Number(total) / this.maxFetch)
        const inRange = (currentPage >= 1) && (currentPage <= totalPage)

        if (inRange || isInfinite) {
            result = await this.repository.getAll(offset, this.maxFetch)
        }

        if (nextCursor + this.maxFetch <= total) {
            nextCursor = nextCursor + this.maxFetch
        } else if (nextCursor + this.maxFetch > total) {
            nextCursor = total
        }

        return res.status(200).json({
            data: result,
            total: Number(total),
            totalPage,
            ...(isInfinite && nextCursor !== total ? {
                nextCursor: Number(nextCursor),
            }: {})
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
            const storeId = parseInt(req.query.storeId as string)
            const payload = req.body
            const result = await this.repository.edit(storeId, payload)
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
            const storeId = parseInt(req.query.storeId as string)
            const isForceDeleted = req.query.forceDelete ? Boolean(req.query.forceDelete as string) : false
            const result = await this.repository.remove(storeId, isForceDeleted)
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


