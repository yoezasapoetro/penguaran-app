import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import CategoryService from "@/service/CategoryService"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req })
    const userId = token?.sub as string
    const service = new CategoryService(userId)

    if (req.method === "POST") {
        console.error(req.body)
        return await service.createHandler(req, res)
    }
}

