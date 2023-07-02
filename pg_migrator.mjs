import "dotenv/config"
import { Pool, neonConfig } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-serverless"
import { migrate } from "drizzle-orm/neon-serverless/migrator"
import ws from "ws"

neonConfig.webSocketConstructor = ws
const connectionString = process.env.PG_DATABASE_URL

const pool = new Pool({
    connectionString,
    max: 1,
})
pool.on("error", err => console.error("[PG] Migrator: ", err))

const client = await pool.connect()

try {
    const db = drizzle(client)
    await client.query("BEGIN")
    await migrate(db, { migrationsFolder: "./db/migrations/pg" })
    await client.query("COMMIT")
} catch (err) {
    await client.query("ROLLBACK")
    throw err
} finally {
    client.release()
}

await pool.end()
