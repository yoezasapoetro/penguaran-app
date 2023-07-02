import { NextApiRequest, NextApiResponse } from "next"
import { dbPg } from "@/lib/db"
import SourcePaymentRepository from "@/repository/SourcePaymentRepository"

export default class SourcePaymentService {
    private repository: SourcePaymentRepository
    private maxFetch = 10

    constructor(userId: string) {
        this.repository = new SourcePaymentRepository(dbPg, userId)
    }

    async getAllHandler(res: NextApiResponse) {
        const result = await this.repository.getAll(this.maxFetch)

        return res.status(200).json({
            data: result,
            total: result.length
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
            console.error('SourcePaymentService', err)
            res.status(500).json({
                status: "error",
                message: "Internal server error"
            })
        }
    }

    async editHandler(req: NextApiRequest, res: NextApiResponse) {
        try {
            const sourcePaymentId = parseInt(req.query.sourcePaymentId as string)
            const payload = req.body
            const result = await this.repository.edit(sourcePaymentId, payload)
            res.status(200).json({
                status: "ok",
                data: result
            })
        } catch (err) {
            console.error('SourcePaymentService', err)
            res.status(500).json({
                status: "error",
                message: "Internal server error"
            })
        }
    }

    async removeHandler(req: NextApiRequest, res: NextApiResponse) {
        try {
            const sourcePaymentId = parseInt(req.query.sourcePaymentId as string)
            const isForceDeleted = req.query.forceDelete ? Boolean(req.query.forceDelete as string) : false
            const result = await this.repository.remove(sourcePaymentId, isForceDeleted)
            res.status(200).json({
                status: "ok",
                data: result
            })
        } catch (err) {
            console.error('SourcePaymentService', err)
            res.status(500).json({
                status: "error",
                message: "Internal server error"
            })
        }
    }
}

