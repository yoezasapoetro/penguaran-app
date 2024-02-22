CREATE TABLE `session` (
	`expires` text DEFAULT CURRENT_TIMESTAMP,
	`sessionToken` text NOT NULL,
	`userId` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `session_token_index` ON `session` (`sessionToken`);--> statement-breakpoint
CREATE INDEX `user_id_index` ON `session` (`userId`);