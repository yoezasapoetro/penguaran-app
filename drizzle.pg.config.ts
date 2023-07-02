import type { Config } from "drizzle-kit"
import "dotenv/config"

const {
    PG_HOST,
    PG_PORT,
    PG_USER,
    PG_PASS,
    PG_DATABASE
} = process.env

export default {
    schema: "./db/schemas/pg.ts",
    out: "./db/migrations/pg",
    driver: "pg",
    dbCredentials: {
        host: PG_HOST as string,
        port: Number(PG_PORT as string),
        user: PG_USER,
        password: PG_PASS,
        database: PG_DATABASE as string,
        ssl: true,
    }
} satisfies Config
