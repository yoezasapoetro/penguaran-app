import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { getToken } from "next-auth/jwt"

import { authOptions } from "../auth/[...nextauth]"
import ExpenseService from "api/src/service/ExpenseService"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    const token = await getToken({ req })

    if (!session || !token) {
        res.status(401).json({ message: "unauthorized" })
        return
    }

    const userId = token?.sub as string

    const service = new ExpenseService(userId)

    if (req.method === "GET") {
        return await service.getDashboardAnalytics(req, res)
    }
}


