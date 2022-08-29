/*
  Warnings:

  - You are about to alter the column `potency` on the `Activity` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,5)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "potency" SET DATA TYPE DOUBLE PRECISION;
