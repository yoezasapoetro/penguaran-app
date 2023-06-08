import { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/lib/db"
import CategoryRepository from "@/repository/CategoryRepository"

export default class CategoryService {
    private repository: CategoryRepository
    private maxFetch = 5

    constructor(userId: string) {
        this.repository = new CategoryRepository(db, userId)
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
            console.error('CategoryService', err)
            res.status(500).json({
                status: "error",
                message: "Internal server error"
            })
        }
    }
}
