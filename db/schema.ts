import { pgTable, varchar, timestamp, integer, uniqueIndex, index, uuid, serial, numeric, date } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"

export const user = pgTable("User", {
	id: uuid("id").default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	username: varchar("username", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	passwordHash: varchar("passwordHash", { length: 255 }),
	source: varchar("source", { length: 255 }).default(sql`'email'::character varying`),
	externalId: varchar("externalId", { length: 255 }),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		emailKey: uniqueIndex("User_email_key").on(table.email),
		usernameEmailIdx: index("User_username_email_idx").on(table.username, table.email),
		usernameKey: uniqueIndex("User_username_key").on(table.username),
	}
});

export const expense = pgTable("Expense", {
	id: serial("id").primaryKey().notNull(),
	categoryId: integer("categoryId").notNull().references(() => category.id),
	userId: uuid("userId").notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	storeId: integer("storeId").notNull().references(() => store.id),
	sourcePaymentId: integer("sourcePaymentId").notNull().references(() => sourcePayment.id),
	total: numeric("total", { precision: 10, scale:  2 }).notNull(),
	expenseDate: date("expenseDate").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		userIdCategoryIdSourcePaymentIdStoreIdExpenseDaIdx: index("Expense_userId_categoryId_sourcePaymentId_storeId_expenseDa_idx").on(table.categoryId, table.userId, table.storeId, table.sourcePaymentId, table.expenseDate),
	}
});

export const store = pgTable("Store", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	address: varchar("address", { length: 255 }),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
	deletedAt: timestamp("deletedAt", { precision: 3, mode: 'string' }),
	userId: uuid("userId").references(() => user.id, { onDelete: "set null", onUpdate: "set null" } ),
},
(table) => {
	return {
		nameAddressIdx: index("Store_name_address_idx").on(table.name, table.address),
	}
});

export const category = pgTable("Category", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
	deletedAt: timestamp("deletedAt", { precision: 3, mode: 'string' }),
	userId: uuid("userId").references(() => user.id, { onDelete: "set null", onUpdate: "set null" } ),
},
(table) => {
	return {
		nameIdx: index("Category_name_idx").on(table.name),
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

export const expenseDetails = pgTable("ExpenseDetails", {
	id: serial("id").primaryKey().notNull(),
	type: varchar("type", { length: 255 }).notNull(),
	detail: varchar("detail", { length: 255 }),
	amount: numeric("amount", { precision: 10, scale:  2 }).notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
	expenseId: integer("expenseId").notNull().references(() => expense.id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		expenseIdTypeIdx: index("ExpenseDetails_expenseId_type_idx").on(table.type, table.expenseId),
	}
});

export const profile = pgTable("Profile", {
	id: uuid("id").default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	firstName: varchar("firstName", { length: 255 }).notNull(),
	lastName: varchar("lastName", { length: 255 }).notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
	userId: uuid("userId").notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
});
