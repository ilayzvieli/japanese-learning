CREATE TABLE `kana_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`character` varchar(10) NOT NULL,
	`type` enum('hiragana','katakana') NOT NULL,
	`correctCount` int NOT NULL DEFAULT 0,
	`totalAttempts` int NOT NULL DEFAULT 0,
	`lastPracticed` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `kana_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pronunciation_attempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`targetText` varchar(255) NOT NULL,
	`transcribedText` varchar(255),
	`accuracy` int NOT NULL DEFAULT 0,
	`feedback` text,
	`attemptedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `pronunciation_attempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quiz_results` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`quizType` enum('hiragana','katakana','mixed') NOT NULL,
	`mode` enum('multiple_choice','typing') NOT NULL,
	`score` int NOT NULL,
	`totalQuestions` int NOT NULL,
	`timeSpent` int NOT NULL DEFAULT 0,
	`completedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quiz_results_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text,
	`email` varchar(320) NOT NULL,
	`passwordHash` varchar(255) NOT NULL,
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`isPaid` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `vocabulary_srs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`wordId` varchar(64) NOT NULL,
	`easeFactor` int NOT NULL DEFAULT 250,
	`interval` int NOT NULL DEFAULT 0,
	`repetitions` int NOT NULL DEFAULT 0,
	`nextReview` timestamp NOT NULL DEFAULT (now()),
	`lastReviewed` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `vocabulary_srs_id` PRIMARY KEY(`id`)
);
