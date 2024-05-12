-- AlterTable
ALTER TABLE "CitizenReport" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Sample" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "SampleParameter" ADD COLUMN     "goodRangeMin" DOUBLE PRECISION,
ADD COLUMN     "okRangeMin" DOUBLE PRECISION;
