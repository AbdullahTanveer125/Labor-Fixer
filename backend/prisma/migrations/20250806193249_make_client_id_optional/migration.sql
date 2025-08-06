/*
  Warnings:

  - A unique constraint covering the columns `[clientId]` on the table `Job` will be added. If there are existing duplicate values, this will fail.
  - Made the column `clientId` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Job" DROP CONSTRAINT "Job_clientId_fkey";

-- AlterTable
ALTER TABLE "public"."Job" ALTER COLUMN "clientId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Job_clientId_key" ON "public"."Job"("clientId");

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."ClientUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
