import { InferModel } from "drizzle-orm"

import { user, expense, expenseDetails, category, sourcePayment, store } from "@/db/schemas/pg"
import { user as base_user, account, session } from "@/db/schemas/sqlite"

// PG
export type User = InferModel<typeof user>
export type UserCreated = InferModel<typeof user, "insert">
export type Category = InferModel<typeof category>
export type CategoryModel = InferModel<typeof category, "insert">
export type SourcePayment = InferModel<typeof sourcePayment>
export type SourcePaymentModel = InferModel<typeof sourcePayment, "insert">
export type Store = InferModel<typeof store>
export type StoreModel = InferModel<typeof store, "insert">
export type Expense = InferModel<typeof expense>
export type ExpenseModel = InferModel<typeof expense, "insert">
export type ExpenseDetails = InferModel<typeof expenseDetails>
export type ExpenseDetailsModel = InferModel<typeof expenseDetails, "insert">

// SQLite
export type BaseUser = InferModel<typeof base_user>
export type Account= InferModel<typeof account>
export type Session = InferModel<typeof session>
export type BaseUserCreated = InferModel<typeof base_user, "insert">
export type AccountCreated = InferModel<typeof account, "insert">
export type SessionCreated = InferModel<typeof session, "insert">

