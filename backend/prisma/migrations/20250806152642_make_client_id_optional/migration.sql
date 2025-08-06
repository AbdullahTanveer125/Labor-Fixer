-- AlterTable
ALTER TABLE "public"."Job" ADD COLUMN     "clientId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."ClientUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
