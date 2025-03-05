CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(80) NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
