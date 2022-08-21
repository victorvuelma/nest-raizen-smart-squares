-- CreateEnum
CREATE TYPE "SesisonStatus" AS ENUM ('STARTING', 'RUNNING', 'ENDING', 'CLOSED');

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "status" "SesisonStatus" NOT NULL DEFAULT 'STARTING';
