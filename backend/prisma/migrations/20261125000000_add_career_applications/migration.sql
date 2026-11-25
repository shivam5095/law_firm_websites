CREATE TYPE "CareerApplicationType" AS ENUM ('internship', 'job');

CREATE TABLE "CareerApplication" (
    "id" TEXT NOT NULL,
    "applicationType" "CareerApplicationType",
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "practiceArea" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "resumeFileName" TEXT NOT NULL,
    "resumeMimeType" TEXT NOT NULL,
    "resumeBytes" BYTEA NOT NULL,
    "consent" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CareerApplication_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "CareerApplication_applicationType_idx" ON "CareerApplication"("applicationType");
CREATE INDEX "CareerApplication_email_idx" ON "CareerApplication"("email");
CREATE INDEX "CareerApplication_status_idx" ON "CareerApplication"("status");
CREATE INDEX "CareerApplication_createdAt_idx" ON "CareerApplication"("createdAt");
