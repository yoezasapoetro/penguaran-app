import { pgTable, varchar, timestamp, integer, uniqueIndex, index, uuid, serial, numeric, date } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"

export const user = pgTable("User", {
	id: uuid("id").default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		emailKey: uniqueIndex("User_email_key").on(table.email),
	}
});

export const store = pgTable("Store", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	type: varchar("type", { length: 255 }).notNull(),
	address: varchar("address", { length: 255 }),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
	deletedAt: timestamp("deletedAt", { precision: 3, mode: 'string' }),
	userId: uuid("userId").references(() => user.id, { onDelete: "set null", onUpdate: "set null" } ),
},
(table) => {
	return {
		nameTypeIdx: index("Store_name_type_idx").on(table.name, table.type),
        userIdStoreIdx: index("Store_userId_idx").on(table.userId),
	}
});

export const category = pgTable("Category", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
    priority: integer("priority").default(0),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
	deletedAt: timestamp("deletedAt", { precision: 3, mode: 'string' }),
	userId: uuid("userId").references(() => user.id, { onDelete: "set null", onUpdate: "set null" } ),
},
(table) => {
	return {
		namePriorityIdx: index("Category_name_priority_idx").on(table.name, table.priority),
        userIdCategoryIdx: index("Category_userId_idx").on(table.userId),
	}
});

export const sourcePayment = pgTable("SourcePayment", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	type: varchar("type", { length: 255 }).notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
	deletedAt: timestamp("deletedAt", { precision: 3, mode: 'string' }),
	userId: uuid("userId").references(() => user.id, { onDelete: "set null", onUpdate: "set null" } ),
},
(table) => {
	return {
		nameTypeIdx: index("SourcePayment_name_type_idx").on(table.name, table.type),
        userIdSourcePaymentIx: index("SourcePayment_userId_idx").on(table.userId),
	}
});

export const expense = pgTable("Expense", {
	id: serial("id").primaryKey().notNull(),
    userId: uuid("userId").notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	categoryId: integer("categoryId").notNull().references(() => category.id, { onDelete: "cascade", onUpdate: "cascade" }),
	storeId: integer("storeId").notNull().references(() => store.id, { onDelete: "cascade", onUpdate: "cascade" }),
	sourcePaymentId: integer("sourcePaymentId").notNull().references(() => sourcePayment.id, { onDelete: "cascade", onUpdate: "cascade" }),
	total: numeric("total", { precision: 10, scale:  2 }).notNull(),
	expenseDate: date("expenseDate").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
        userIdExpenseIdx: index("Expense_userId_idx").on(table.userId),
        categoryIdExpenseIdx: index("Expense_categoryId_idx").on(table.categoryId),
        storeIdExpenseIdx: index("Expense_storeId_idx").on(table.storeId),
        sourcePaymentIdExpenseIdx: index("Expense_sourcePaymentId_idx").on(table.sourcePaymentId),
	}
});

export const expenseDetails = pgTable("ExpenseDetails", {
	id: serial("id").primaryKey().notNull(),
	detail: varchar("detail", { length: 255 }),
	amount: numeric("amount", { precision: 10, scale:  2 }).notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
	expenseId: integer("expenseId").notNull().references(() => expense.id, { onUpdate: "cascade", onDelete: "cascade" }),
},
(table) => {
	return {
        expenseIdIdx: index("ExpenseDetails_expenseId_idx").on(table.expenseId),
	}
});

export const expenseSplits = pgTable("ExpenseSplits", {
	id: serial("id").primaryKey().notNull(),
	splitAmount: numeric("splitAmount", { precision: 10, scale:  2 }).notNull(),
	expenseId: integer("expenseId").notNull().references(() => expense.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		expenseIdIdx: index("ExpenseSplits_expenseId_idx").on(table.expenseId),
	}
});
