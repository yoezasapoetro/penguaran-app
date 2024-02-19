import Dotenv from "dotenv"

Dotenv.config({
    path: "../../../"
})

const {
    PG_HOST,
    PG_PORT,
    PG_USER,
    PG_PASS,
    PG_DATABASE
} = process.env

/** @type {import('drizzle-kit').Config} */
module.exports = {
    schema: "./schemas/pg.ts",
    out: "./migrations/pg",
    driver: "pg",
    dbCredentials: {
        host: PG_HOST,
        port: PG_PORT,
        user: PG_USER,
        password: PG_PASS,
        database: PG_DATABASE,
        ssl: true,
    }
}
