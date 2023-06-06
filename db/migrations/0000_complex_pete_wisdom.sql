-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "User" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"passwordHash" varchar(255),
	"source" varchar(255) DEFAULT 'email'::character varying,
	"externalId" varchar(255),
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Expense" (
	"id" serial PRIMARY KEY NOT NULL,
	"categoryId" integer NOT NULL,
	"userId" uuid NOT NULL,
	"storeId" integer NOT NULL,
	"sourcePaymentId" integer NOT NULL,
	"total" numeric(10, 2) NOT NULL,
	"expenseDate" date NOT NULL,
	"receiptImage" bytea,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Store" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"address" varchar(255),
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"userId" uuid
);

CREATE TABLE IF NOT EXISTS "Category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"userId" uuid
);

CREATE TABLE IF NOT EXISTS "SourcePayment" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"userId" uuid
);

CREATE TABLE IF NOT EXISTS "ExpenseSplits" (
	"id" serial PRIMARY KEY NOT NULL,
	"splitAmount" numeric(10, 2) NOT NULL,
	"expenseId" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS "ExpenseDetails" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(255) NOT NULL,
	"detail" varchar(255),
	"amount" numeric(10, 2) NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"expenseId" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS "Profile" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"userId" uuid NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User" ("email");
CREATE INDEX IF NOT EXISTS "User_username_email_idx" ON "User" ("username","email");
CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "User" ("username");
CREATE INDEX IF NOT EXISTS "Expense_userId_categoryId_sourcePaymentId_storeId_expenseDa_idx" ON "Expense" ("categoryId","userId","storeId","sourcePaymentId","expenseDate");
CREATE INDEX IF NOT EXISTS "Store_name_address_idx" ON "Store" ("name","address");
CREATE INDEX IF NOT EXISTS "Category_name_idx" ON "Category" ("name");
CREATE INDEX IF NOT EXISTS "SourcePayment_name_type_idx" ON "SourcePayment" ("name","type");
CREATE INDEX IF NOT EXISTS "ExpenseSplits_expenseId_idx" ON "ExpenseSplits" ("expenseId");
CREATE INDEX IF NOT EXISTS "ExpenseDetails_expenseId_type_idx" ON "ExpenseDetails" ("type","expenseId");
DO $$ BEGIN
 ALTER TABLE "Expense" ADD CONSTRAINT "Expense_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Expense" ADD CONSTRAINT "Expense_sourcePaymentId_fkey" FOREIGN KEY ("sourcePaymentId") REFERENCES "SourcePayment"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Expense" ADD CONSTRAINT "Expense_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Store" ADD CONSTRAINT "Store_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE set null ON UPDATE set null;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE set null ON UPDATE set null;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "SourcePayment" ADD CONSTRAINT "SourcePayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE set null ON UPDATE set null;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "ExpenseSplits" ADD CONSTRAINT "ExpenseSplits_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "ExpenseDetails" ADD CONSTRAINT "ExpenseDetails_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/
