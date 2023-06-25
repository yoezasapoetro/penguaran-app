DROP TABLE "_prisma_migrations";
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_categoryId_fkey";

ALTER TABLE "Expense" DROP CONSTRAINT "Expense_sourcePaymentId_fkey";

ALTER TABLE "Expense" DROP CONSTRAINT "Expense_storeId_fkey";

ALTER TABLE "Expense" DROP CONSTRAINT "Expense_userId_fkey";

ALTER TABLE "Store" DROP CONSTRAINT "Store_userId_fkey";

ALTER TABLE "Category" DROP CONSTRAINT "Category_userId_fkey";

ALTER TABLE "SourcePayment" DROP CONSTRAINT "SourcePayment_userId_fkey";

ALTER TABLE "ExpenseSplits" DROP CONSTRAINT "ExpenseSplits_expenseId_fkey";

ALTER TABLE "ExpenseDetails" DROP CONSTRAINT "ExpenseDetails_expenseId_fkey";

ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

ALTER TABLE "User" ALTER COLUMN "createdAt" SET DEFAULT now();
ALTER TABLE "Expense" ALTER COLUMN "createdAt" SET DEFAULT now();
ALTER TABLE "Store" ALTER COLUMN "createdAt" SET DEFAULT now();
ALTER TABLE "Category" ALTER COLUMN "createdAt" SET DEFAULT now();
ALTER TABLE "SourcePayment" ALTER COLUMN "createdAt" SET DEFAULT now();
ALTER TABLE "ExpenseDetails" ALTER COLUMN "createdAt" SET DEFAULT now();
ALTER TABLE "Profile" ALTER COLUMN "createdAt" SET DEFAULT now();
DO $$ BEGIN
 ALTER TABLE "Expense" ADD CONSTRAINT "Expense_categoryId_Category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Expense" ADD CONSTRAINT "Expense_storeId_Store_id_fk" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Expense" ADD CONSTRAINT "Expense_sourcePaymentId_SourcePayment_id_fk" FOREIGN KEY ("sourcePaymentId") REFERENCES "SourcePayment"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Store" ADD CONSTRAINT "Store_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE set null ON UPDATE set null;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE set null ON UPDATE set null;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "SourcePayment" ADD CONSTRAINT "SourcePayment_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE set null ON UPDATE set null;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "ExpenseSplits" ADD CONSTRAINT "ExpenseSplits_expenseId_Expense_id_fk" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "ExpenseDetails" ADD CONSTRAINT "ExpenseDetails_expenseId_Expense_id_fk" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "Expense" DROP COLUMN IF EXISTS "receiptImage";
