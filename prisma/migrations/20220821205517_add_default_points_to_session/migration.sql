/*
  Warnings:

  - The `status` column on the `Session` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('STARTING', 'RUNNING', 'ENDING', 'CLOSED');

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "points" SET DEFAULT 0,
DROP COLUMN "status",
ADD COLUMN     "status" "SessionStatus" NOT NULL DEFAULT 'STARTING';

-- DropEnum
DROP TYPE "SesisonStatus";
