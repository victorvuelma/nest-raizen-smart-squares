/*
  Warnings:

  - A unique constraint covering the columns `[offerId,code]` on the table `Activation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Activation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activation" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Activation_offerId_code_key" ON "Activation"("offerId", "code");
