import { z } from "zod"
import { createEnv } from "@t3-oss/env-nextjs"

export const env = createEnv({
    server: {
        NODE_ENV: z.enum(["development", "staging", "test", "production"]),
        NEXTAUTH_URL: z.string().url(),
        NEXTAUTH_SECRET: z.string(),
        PG_DATABASE_URL: z.string().url(),
        GOOGLE_CLIENT_ID: z.string(),
        GOOGLE_CLIENT_SECRET: z.string(),
        SQLITE_DATABASE_URL: z.string().url(),
        SQLITE_DATABASE_PATH: z.string(),
        TURSO_AUTH_TOKEN: z.string(),
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        PG_DATABASE_URL: process.env.PG_DATABASE_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        SQLITE_DATABASE_URL: process.env.SQLITE_DATABASE_URL,
        SQLITE_DATABASE_PATH: process.env.SQLITE_DATABASE_PATH,
        TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
    }
})

