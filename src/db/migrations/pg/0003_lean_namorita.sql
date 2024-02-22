DROP TABLE "Profile";--> statement-breakpoint
DROP INDEX IF EXISTS "User_username_email_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "User_username_key";--> statement-breakpoint
ALTER TABLE "User" DROP COLUMN IF EXISTS "username";--> statement-breakpoint
ALTER TABLE "User" DROP COLUMN IF EXISTS "passwordHash";--> statement-breakpoint
ALTER TABLE "User" DROP COLUMN IF EXISTS "source";--> statement-breakpoint
ALTER TABLE "User" DROP COLUMN IF EXISTS "externalId";