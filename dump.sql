CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(45) NOT NULL,
	"password" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"ismedic" BOOLEAN NOT NULL DEFAULT 'false',
	"specialty" TEXT,
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW(),
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"token" TEXT NOT NULL,
	"userid" integer NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW(),
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY NOT NULL,
  medicid INTEGER REFERENCES users(id),
  avaiable_date date NOT NULL,
  avaiable_time time NOT NULL;
);

CREATE TABLE "medicalappointments" (
	"id" serial NOT NULL,
	"medicid" integer NOT NULL,
	"userid" integer NOT NULL,
	'date' DATETIME not null,
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW(),
	"updatedAt" timestamp with time zone NOT NULL,
	CONSTRAINT "medicalappointments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userid") REFERENCES "users"("id");

ALTER TABLE "medicalappointments" ADD CONSTRAINT "medicalappointments_fk0" FOREIGN KEY ("medicid") REFERENCES "users"("id");
ALTER TABLE "medicalappointments" ADD CONSTRAINT "medicalappointments_fk1" FOREIGN KEY ("userid") REFERENCES "users"("id");



