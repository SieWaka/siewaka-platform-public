-- CreateTable
CREATE TABLE "CRQuestion" (
    "id" UUID NOT NULL,
    "priority" INTEGER NOT NULL,
    "hidden" BOOLEAN NOT NULL,
    "question" VARCHAR(512) NOT NULL,

    CONSTRAINT "CRQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CitizenReport" (
    "id" UUID NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "takenById" UUID,
    "contactInfo" VARCHAR(256),
    "ip" VARCHAR(16),

    CONSTRAINT "CitizenReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CRAnswer" (
    "id" UUID NOT NULL,
    "questionId" UUID NOT NULL,
    "reportId" UUID NOT NULL,
    "answer" VARCHAR(512),
    "attachment" VARCHAR(2048),

    CONSTRAINT "CRAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CitizenReport" ADD CONSTRAINT "CitizenReport_takenById_fkey" FOREIGN KEY ("takenById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CRAnswer" ADD CONSTRAINT "CRAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "CRQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CRAnswer" ADD CONSTRAINT "CRAnswer_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "CitizenReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
