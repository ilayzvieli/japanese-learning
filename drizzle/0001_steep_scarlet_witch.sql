CREATE TABLE `story_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`storyId` varchar(64) NOT NULL,
	`completed` boolean NOT NULL DEFAULT false,
	`completedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `story_progress_id` PRIMARY KEY(`id`)
);
