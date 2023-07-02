ALTER TABLE "Expense" DROP CONSTRAINT "Expense_categoryId_Category_id_fk";
--> statement-breakpoint
ALTER TABLE "ExpenseDetails" DROP CONSTRAINT "ExpenseDetails_expenseId_Expense_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "Category_name_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "Expense_userId_categoryId_sourcePaymentId_storeId_expenseDa_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "ExpenseDetails_expenseId_type_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "Store_name_address_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Category_name_priority_idx" ON "Category" ("name","priority");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Category_userId_idx" ON "Category" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Expense_userId_idx" ON "Expense" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Expense_categoryId_idx" ON "Expense" ("categoryId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Expense_storeId_idx" ON "Expense" ("storeId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Expense_sourcePaymentId_idx" ON "Expense" ("sourcePaymentId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ExpenseDetails_expenseId_idx" ON "ExpenseDetails" ("expenseId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "SourcePayment_userId_idx" ON "SourcePayment" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Store_name_type_idx" ON "Store" ("name","type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Store_userId_idx" ON "Store" ("userId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Expense" ADD CONSTRAINT "Expense_categoryId_Category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ExpenseDetails" ADD CONSTRAINT "ExpenseDetails_expenseId_Expense_id_fk" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "ExpenseDetails" DROP COLUMN IF EXISTS "type";
