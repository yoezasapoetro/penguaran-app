import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import StoreService from "@/service/StoreService"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req })
    const userId = token?.sub as string
    const service = new StoreService(userId)

    if (req.method === "POST") {
        return await service.createHandler(req, res)
    }
}

