-- Initial Create Table Query and Tests in Postico 

CREATE TABLE "todo" (
	"id" serial primary key,
	"task" varchar(240),
	"completed" boolean);

INSERT INTO "todo" ("task", "completed")
VALUES ('walk dogs', false);

INSERT INTO "todo" ("task", "completed")
VALUES 	('fold laundry', true),
		('wash dishes', false),
		('do homework', false);
		
DELETE FROM "todo" WHERE "task" = 'wash dishes';

UPDATE "todo" SET "completed" = true WHERE "task" = 'do homework';