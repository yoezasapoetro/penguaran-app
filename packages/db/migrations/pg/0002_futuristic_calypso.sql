ALTER TABLE "Category" ADD COLUMN "deletedAt" timestamp(3);
ALTER TABLE "SourcePayment" ADD COLUMN "deletedAt" timestamp(3);
ALTER TABLE "Store" ADD COLUMN "deletedAt" timestamp(3);