import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { getToken } from "next-auth/jwt"

import { authOptions } from "../auth/[...nextauth]"
import CategoryService from "@/service/CategoryService"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    const token = await getToken({ req })

    if (!session || !token) {
        res.status(401).json({ message: "unauthorized" })
        return
    }

    const userId = token?.sub as string

    const service = new CategoryService(userId)

    if (req.method === "GET") {
        return await service.getAllHandler(req, res)
    }

    if (req.method === "POST") {
        return await service.createHandler(req, res)
    }
}
