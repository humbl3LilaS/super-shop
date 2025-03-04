CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(200) NOT NULL,
	"slug" varchar(200) NOT NULL,
	"description" text NOT NULL,
	"images" text[] NOT NULL,
	"price" integer NOT NULL,
	"brand" varchar(200) NOT NULL,
	"rating" numeric(2) NOT NULL,
	"numReviews" integer NOT NULL,
	"stock" integer NOT NULL,
	"isFeatured" boolean DEFAULT false NOT NULL,
	"banner" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "products_id_unique" UNIQUE("id"),
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
