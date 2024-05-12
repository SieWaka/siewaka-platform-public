/*
  Warnings:

  - You are about to drop the column `country` on the `SamplingPoint` table. All the data in the column will be lost.
  - Added the required column `countryId` to the `SamplingPoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SamplingPoint" DROP COLUMN "country",
ADD COLUMN     "countryId" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "Device_samplingPointId_idx" ON "Device"("samplingPointId");

-- CreateIndex
CREATE INDEX "Device_ownerId_idx" ON "Device"("ownerId");

-- CreateIndex
CREATE INDEX "Sample_samplingPointId_idx" ON "Sample"("samplingPointId");

-- CreateIndex
CREATE INDEX "SampleMeasurementValue_sampleId_idx" ON "SampleMeasurementValue"("sampleId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "SamplingPoint" ADD CONSTRAINT "SamplingPoint_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
