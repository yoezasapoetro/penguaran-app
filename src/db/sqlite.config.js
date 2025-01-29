import Dotenv from "dotenv"
import { env } from "utils/env"

Dotenv.config({
    path: "../../../"
})

/** @type {import('drizzle-kit').Config } */
module.exports = {
    schema: "./schema.ts",
    out: "./migration",
    driver: "turso",
    dbCredentials: {
        url: env.SQLITE_DATABASE_URL,
        authToken: env.TURSO_AUTH_TOKEN
    }
}

