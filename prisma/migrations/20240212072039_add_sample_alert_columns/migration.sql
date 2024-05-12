/*
  Warnings:

  - Added the required column `message` to the `SampleAlert` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewerId` to the `SampleAlert` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sampleId` to the `SampleAlert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SampleAlert" ADD COLUMN     "message" VARCHAR(256) NOT NULL,
ADD COLUMN     "reviewerId" UUID NOT NULL,
ADD COLUMN     "sampleId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SampleAlert" ADD CONSTRAINT "SampleAlert_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "Sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SampleAlert" ADD CONSTRAINT "SampleAlert_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
