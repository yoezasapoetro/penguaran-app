import type { Config } from "drizzle-kit"

export default {
    schema: "./db/schema.ts",
    out: "./db/migrations",
    connectionString: process.env.DATABASE_URL
} satisfies Config
