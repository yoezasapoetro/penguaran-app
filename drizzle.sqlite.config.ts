import type { Config } from "drizzle-kit"
import "dotenv/config"

export default {
    schema: "./db/schemas/sqlite.ts",
    out: "./db/migrations/sqlite",
    driver: "turso",
    dbCredentials: {
        url: process.env.SQLITE_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN
    }
} satisfies Config

