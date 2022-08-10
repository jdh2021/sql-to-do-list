-- Initial Create Table Query and Tests in Postico 

CREATE TABLE "todo" (
	"id" serial primary key,
	"description" varchar(240),
	"completed" boolean);

INSERT INTO "todo" ("description", "completed")
VALUES ('walk dogs', false);

INSERT INTO "todo" ("description", "completed")
VALUES 	('fold laundry', true),
		('wash dishes', false),
		('do homework', false);
		
DELETE FROM "todo" WHERE "description" = 'wash dishes';

UPDATE "todo" SET "completed" = true WHERE "description" = 'do homework';