import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

import { user as base_user, account, session } from "./schema"

// SQLite
export const BaseUserSchema = createSelectSchema(base_user)
export const AccountSchema = createSelectSchema(account)
export const SessionSchema = createSelectSchema(session)
export const BaseUserCreatedSchema = createInsertSchema(base_user)
export const AccountCreatedSchema = createInsertSchema(account)
export const SessionCreatedSchema = createInsertSchema(session)

// Types
export type BaseUser = z.infer<typeof BaseUserSchema>
export type Account = z.infer<typeof AccountSchema>
export type Session = z.infer<typeof SessionSchema>
export type BaseUserCreated = z.infer<typeof BaseUserCreatedSchema>
export type AccountCreated = z.infer<typeof AccountCreatedSchema>
export type SessionCreated = z.infer<typeof SessionCreatedSchema>
export type User = {
  id: string
  email: string
  createdAt: string
  updatedAt: string
}
export type UserCreated = {
  id?: string
  email: string
  createdAt?: string | undefined
  updatedAt: string
}
