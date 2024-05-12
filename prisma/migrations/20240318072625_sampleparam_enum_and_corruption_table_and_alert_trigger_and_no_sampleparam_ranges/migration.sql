/*
  Warnings:

  - You are about to drop the column `goodRangeMin` on the `SampleParameter` table. All the data in the column will be lost.
  - You are about to drop the column `okRangeMin` on the `SampleParameter` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "SampleParameterType" ADD VALUE 'OTROS';
ALTER TYPE "SampleParameterType" ADD VALUE 'MICROORGANISMOS';
ALTER TYPE "SampleParameterType" ADD VALUE 'ORGANICA';

-- AlterTable
ALTER TABLE "SampleAlert" ADD COLUMN     "ack" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "SampleParameter" DROP COLUMN "goodRangeMin",
DROP COLUMN "okRangeMin";

-- CreateTable
CREATE TABLE "CorruptionReport" (
    "id" UUID NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "CorruptionReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SampleAlertTrigger" (
    "id" UUID NOT NULL,
    "parameterId" UUID NOT NULL,
    "min" DOUBLE PRECISION NOT NULL,
    "max" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SampleAlertTrigger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SampleAlertTrigger_parameterId_idx" ON "SampleAlertTrigger"("parameterId");

-- AddForeignKey
ALTER TABLE "SampleAlertTrigger" ADD CONSTRAINT "SampleAlertTrigger_parameterId_fkey" FOREIGN KEY ("parameterId") REFERENCES "SampleParameter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
