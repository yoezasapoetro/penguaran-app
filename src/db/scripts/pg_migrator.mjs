import Dotenv from "dotenv"

Dotenv.config({
    path: "../../../"
})

import { Pool, neonConfig } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-serverless"
import { migrate } from "drizzle-orm/neon-serverless/migrator"
import ws from "ws"

const { PG_DATABASE_URL } = process.env

neonConfig.webSocketConstructor = ws

const connectionString = PG_DATABASE_URL
const migrationsFolder = "./db/migrations/pg"

const pool = new Pool({
    connectionString,
    max: 1,
})
pool.on("error", err => console.error("[PG] Migrator: ", err))

const client = await pool.connect()

try {
    const db = drizzle(client)
    await client.query("BEGIN")
    await migrate(db, { migrationsFolder })
    await client.query("COMMIT")
} catch (err) {
    await client.query("ROLLBACK")
    throw err
} finally {
    client.release()
}

await pool.end()
