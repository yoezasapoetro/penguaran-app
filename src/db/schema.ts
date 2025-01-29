import { sql } from "drizzle-orm"
import { sqliteTable, int, text, index } from "drizzle-orm/sqlite-core"

export const user = sqliteTable("user", {
  id: text("id").primaryKey().notNull(),
  email: text("email").notNull(),
  name: text("name"),
  emailVerified: text("emailVerified").default(sql`CURRENT_TIMESTAMP`),
  image: text("image"),
}, (table) => ({
  idIdx: index("id_user_index").on(table.id),
  emailIdx: index("email_index").on(table.email),
  nameIdx: index("name_index").on(table.name),
}))

export const verification_token = sqliteTable("verification_token", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: text("expires").default(sql`CURRENT_TIMESTAMP`),
})

export const account = sqliteTable("account", {
  id: text("id").primaryKey().notNull(),
  userId: text("userId").notNull(),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: int("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
}, (table) => ({
  idIdx: index("id_account_index").on(table.id),
  userIdIdx: index("userId_index").on(table.userId),
  providerIdx: index("provider_index").on(table.provider),
  providerAccountIdIdx: index("providerAccountId_index").on(table.providerAccountId),
}))

export const session = sqliteTable("session", {
    expires: text("expires").default(sql`CURRENT_TIMESTAMP`),
    sessionToken: text("sessionToken").notNull(),
    userId: text("userId").notNull(),
  }, (table) => ({
    sessionTokenIdx: index("session_token_index").on(table.sessionToken),
    userIdIdx: index("user_id_index").on(table.userId),
  })
)
