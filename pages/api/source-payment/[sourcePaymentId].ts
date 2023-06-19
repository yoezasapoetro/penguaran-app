import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import SourcePaymentService from "@/service/SourcePaymentService"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req })
    const userId = token?.sub as string
    const service = new SourcePaymentService(userId)

    if (req.method === "PUT") {
        return await service.editHandler(req, res)
    }

    if (req.method === "DELETE") {
        return await service.removeHandler(req, res)
    }
}

