import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import { getServerSession } from "next-auth"

import { authOptions } from "../auth/[...nextauth]"
import CategoryService from "api/src/service/CategoryService"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    const token = await getToken({ req })

    if (!session || !token) {
        res.status(401).json({ message: "unauthorized" })
        return
    }

    const userId = token?.sub as string
    const service = new CategoryService(userId)

    if (req.method === "PUT") {
        return await service.editHandler(req, res)
    }

    if (req.method === "DELETE") {
        return await service.removeHandler(req, res)
    }
}


