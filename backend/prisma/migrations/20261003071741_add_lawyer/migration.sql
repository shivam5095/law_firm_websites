/*
  Warnings:

  - You are about to drop the `LegacyInternshipApplication` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "LegacyInternshipApplication";

-- CreateTable
CREATE TABLE "Lawyer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "bio" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "image" TEXT,
    "experience" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lawyer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Lawyer_name_idx" ON "Lawyer"("name");

-- CreateIndex
CREATE INDEX "Lawyer_specialization_idx" ON "Lawyer"("specialization");

-- CreateIndex
CREATE INDEX "Lawyer_createdAt_idx" ON "Lawyer"("createdAt");
