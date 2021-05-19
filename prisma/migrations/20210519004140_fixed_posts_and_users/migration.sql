-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'SUPERADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT E'USER',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updater_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "uuid" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updater_at" TIMESTAMP(3) NOT NULL,
    "body" TEXT,
    "UserId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.uuid_unique" ON "users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "posts.uuid_unique" ON "posts"("uuid");

-- AddForeignKey
ALTER TABLE "posts" ADD FOREIGN KEY ("UserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
