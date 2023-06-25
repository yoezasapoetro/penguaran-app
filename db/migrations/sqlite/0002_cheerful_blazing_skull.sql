CREATE INDEX `id_account_index` ON `account` (`id`);--> statement-breakpoint
CREATE INDEX `userId_index` ON `account` (`userId`);--> statement-breakpoint
CREATE INDEX `provider_index` ON `account` (`provider`);--> statement-breakpoint
CREATE INDEX `providerAccountId_index` ON `account` (`providerAccountId`);--> statement-breakpoint
CREATE INDEX `id_user_index` ON `user` (`id`);--> statement-breakpoint
CREATE INDEX `email_index` ON `user` (`email`);--> statement-breakpoint
CREATE INDEX `name_index` ON `user` (`name`);