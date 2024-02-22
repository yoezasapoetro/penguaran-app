import { Pool } from "@neondatabase/serverless"
import { drizzle as neonDrizzle } from "drizzle-orm/neon-serverless"
import { drizzle as tursoDrizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"

import * as pgSchema from "./schemas/pg";
import * as sqliteSchema from "./schemas/sqlite";

const { SQLITE_DATABASE_URL, TURSO_AUTH_TOKEN, PG_DATABASE_URL, NODE_ENV } = process.env

const isDev = NODE_ENV === "development"

export const pool = new Pool({
    connectionString: PG_DATABASE_URL as string
})

export const dbPg = neonDrizzle(pool, { schema: pgSchema, logger: isDev })

const sqliteClient = createClient({
    url: SQLITE_DATABASE_URL as string,
    authToken: TURSO_AUTH_TOKEN as string,
})

export const dbSqlite = tursoDrizzle(sqliteClient, { schema: sqliteSchema, logger: isDev })

