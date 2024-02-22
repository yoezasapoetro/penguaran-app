import type { CreateNextContextOptions } from "@trpc/server/adapters/next"
import { getToken } from "next-auth/jwt"
import { dbPg } from "db/instance"

interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
    userId: string | undefined
}

export async function createInnerContext(opts?: CreateInnerContextOptions) {
    return {
        dbConn: dbPg,
        userId: opts?.userId
    }
}

export async function createContext(opts: CreateNextContextOptions) {
    const token = await getToken({ req: opts.req })

    const contextInner = await createInnerContext({ userId: token?.sub })

    return {
        ...contextInner,
        req: opts.req,
        res: opts.res
    }
}

export type Context = Awaited<ReturnType<typeof createContext>>
