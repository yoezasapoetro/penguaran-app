import { drizzle as tursoDrizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"
import { env } from "utils/env"

import * as sqliteSchema from "./schema";

const isDev = env.NODE_ENV === "development"

const sqliteClient = createClient({
    // url: SQLITE_DATABASE_PATH as string,
    // syncUrl: SQLITE_DATABASE_URL as string,
    url: env.SQLITE_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
})

export const db = tursoDrizzle(sqliteClient, { schema: sqliteSchema, logger: isDev })

