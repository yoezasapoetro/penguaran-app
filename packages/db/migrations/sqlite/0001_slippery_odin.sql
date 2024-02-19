CREATE TABLE `account` (
	`id` text NOT NULL,
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`refresh_token` text NOT NULL,
	`access_token` text NOT NULL,
	`expires_at` integer NOT NULL,
	`token_type` text NOT NULL,
	`scope` text NOT NULL,
	`id_token` text NOT NULL,
	`session_state` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`emailVerified` text DEFAULT CURRENT_TIMESTAMP,
	`image` text
);
--> statement-breakpoint
CREATE TABLE `verification_token` (
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` text DEFAULT CURRENT_TIMESTAMP
);
