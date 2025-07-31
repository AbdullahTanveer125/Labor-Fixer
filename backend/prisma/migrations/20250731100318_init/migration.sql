/*
  Warnings:

  - You are about to drop the column `email` on the `EmployeeUser` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `EmployeeUser` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `EmployeeUser` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `EmployeeUser` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `EmployeeUser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `EmployeeUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `EmployeeUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."EmployeeUser_email_key";

-- AlterTable
ALTER TABLE "public"."EmployeeUser" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "phone",
DROP COLUMN "profileImage",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profileImage" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeUser_userId_key" ON "public"."EmployeeUser"("userId");

-- AddForeignKey
ALTER TABLE "public"."EmployeeUser" ADD CONSTRAINT "EmployeeUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
