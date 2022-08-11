-- Initial Create Table Query and Tests in Postico 

CREATE TABLE "todo" (
	"id" serial primary key,
	"description" varchar(240) not null unique,
	"completed" boolean not null,
	"time_added" timestamp with time zone not null,
	"time_completed" timestamp with time zone);

INSERT INTO "todo" ("description", "completed", "time_added", "time_completed")
VALUES 	('fold laundry', false, '2022-08-11 11:22:40', null),
		('wash dishes', true, '2022-08-11 11:25:40', '2022-08-11 13:25:40');