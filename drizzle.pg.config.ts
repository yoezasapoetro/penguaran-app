import type { Config } from "drizzle-kit"

export default {
    schema: "./db/schemas/pg.ts",
    out: "./db/migrations/pg",
    dbCredentials: {
        connectionString: process.env.PG_DATABASE_URL
    }
} satisfies Config
