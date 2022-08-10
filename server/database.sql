-- Initial Create Table Query and Tests in Postico 

CREATE TABLE "todo" (
	"id" serial primary key,
	"description" varchar(240) not null unique,
	"completed" boolean not null,
	"time" time not null);

INSERT INTO "todo" ("description", "completed", "time")
VALUES ('walk dogs', false, '08:15');

INSERT INTO "todo" ("description", "completed", "time")
VALUES 	('fold laundry', true, '12:00'),
		('wash dishes', false, '12:45'),
		('do homework', false, '14:15');
		
DELETE FROM "todo" WHERE "description" = 'wash dishes';

UPDATE "todo" SET "completed" = true WHERE "description" = 'do homework';