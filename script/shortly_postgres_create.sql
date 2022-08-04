CREATE TABLE "public.customers" (
	"id" serial NOT NULL,
	"name" varchar(50) NOT NULL,
	"email" varchar(50) NOT NULL UNIQUE,
	"password" varchar(20) NOT NULL,
	"token" varchar NOT NULL,
	"isLogedIn" BOOLEAN NOT NULL,
	CONSTRAINT "customers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.shortedLink" (
	"id" serial NOT NULL,
	"shortedLink" TEXT NOT NULL UNIQUE,
	"customerID" integer NOT NULL,
	"URL" TEXT NOT NULL,
	"isAvailable" BOOLEAN NOT NULL DEFAULT 'true',
	CONSTRAINT "shortedLink_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.visualizations" (
	"id" serial NOT NULL,
	"shortedLinkId" integer NOT NULL,
	CONSTRAINT "visualizations_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "shortedLink" ADD CONSTRAINT "shortedLink_fk0" FOREIGN KEY ("customerID") REFERENCES "customers"("id");

ALTER TABLE "visualizations" ADD CONSTRAINT "visualizations_fk0" FOREIGN KEY ("shortedLinkId") REFERENCES "shortedLink"("id");




