import Dotenv from "dotenv"

Dotenv.config({
    path: "../../../"
})

const { SQLITE_DATABASE_URL, TURSO_AUTH_TOKEN } = process.env

/** @type {import('drizzle-kit').Config } */
module.exports = {
    schema: "./schemas/sqlite.ts",
    out: "./migrations/sqlite",
    driver: "turso",
    dbCredentials: {
        url: SQLITE_DATABASE_URL,
        authToken: TURSO_AUTH_TOKEN
    }
}

