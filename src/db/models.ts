import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

import { user, expense, expenseDetails, category, sourcePayment, store } from "./schemas/pg"
import { user as base_user, account, session } from "./schemas/sqlite"

// PG
export const UserSchema = createSelectSchema(user)
export const UserCreatedSchema = createInsertSchema(user)
export const CategorySchema = createSelectSchema(category)
export const CategoryModelSchema = createInsertSchema(category)
export const SourcePaymentSchema = createSelectSchema(sourcePayment)
export const SourcePaymentModelSchema = createInsertSchema(sourcePayment)
export const StoreSchema = createSelectSchema(store)
export const StoreModelSchema = createInsertSchema(store)
export const ExpenseSchema = createSelectSchema(expense)
export const ExpenseModelSchema = createInsertSchema(expense)
export const ExpenseDetailsSchema = createSelectSchema(expenseDetails)
export const ExpenseDetailsModelSchema = createInsertSchema(expenseDetails)

export type User = z.infer<typeof UserSchema>
export type UserCreated = z.infer<typeof UserCreatedSchema>
export type Category = z.infer<typeof CategorySchema>
export type CategoryModel = z.infer<typeof CategoryModelSchema>
export type SourcePayment = z.infer<typeof SourcePaymentSchema>
export type SourcePaymentModel = z.infer<typeof SourcePaymentModelSchema>
export type Store = z.infer<typeof StoreSchema>
export type StoreModel = z.infer<typeof StoreModelSchema>
export type Expense = z.infer<typeof ExpenseSchema>
export type ExpenseModel = z.infer<typeof ExpenseModelSchema>
export type ExpenseDetails = z.infer<typeof ExpenseDetailsSchema>
export type ExpenseDetailsModel = z.infer<typeof ExpenseDetailsModelSchema>

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

