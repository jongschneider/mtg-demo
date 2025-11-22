CREATE TABLE `cards` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`names` text,
	`mana_cost` text,
	`cmc` real,
	`colors` text,
	`color_identity` text,
	`type` text,
	`supertypes` text,
	`types` text,
	`subtypes` text,
	`text` text,
	`flavor` text,
	`original_text` text,
	`original_type` text,
	`power` text,
	`toughness` text,
	`loyalty` text,
	`hand` text,
	`life` text,
	`set_code` text NOT NULL,
	`set_name` text,
	`rarity` text,
	`number` text,
	`artist` text,
	`layout` text,
	`multiverseid` integer,
	`variations` text,
	`watermark` text,
	`border` text,
	`timeshifted` integer DEFAULT false,
	`reserved` integer DEFAULT false,
	`starter` integer DEFAULT false,
	`image_url` text,
	`release_date` text,
	`source` text,
	`printings` text,
	`legalities` text,
	`foreign_names` text,
	`rulings` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE TABLE `user_cards` (
	`user_id` text NOT NULL,
	`card_id` text NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	PRIMARY KEY(`card_id`, `user_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`card_id`) REFERENCES `cards`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`display_name` text NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);