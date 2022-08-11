-- Initial Create Table Query and Tests in Postico 

CREATE TABLE "todo" (
	"id" serial primary key,
	"description" varchar(240) not null unique,
	"completed" boolean not null,
	"time_added" time not null,
	"time_completed" time);

INSERT INTO "todo" ("description", "completed", "time_added", "time_completed")
VALUES ('walk dogs', false, '08:15', '12:15');

INSERT INTO "todo" ("description", "completed", "time_added", "time_completed")
VALUES 	('fold laundry', true, '12:00', '12:35'),
		('wash dishes', false, '12:45', '12:52'),
		('do homework', false, '14:15', '18:52');