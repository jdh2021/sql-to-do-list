-- Initial Create Table Query

CREATE TABLE "todo" (
	"id" serial primary key,
	"description" varchar(40) not null,
	"completed" boolean not null,
	"time_added" timestamp with time zone not null,
	"time_completed" timestamp with time zone );