/*
  Warnings:

  - A unique constraint covering the columns `[summonerId]` on the table `RankedTFT` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `summonerId` to the `RankedTFT` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RankedTFT" DROP CONSTRAINT "RankedTFT_puuid_fkey";

-- AlterTable
ALTER TABLE "RankedTFT" ADD COLUMN     "summonerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RankedTFT_summonerId_key" ON "RankedTFT"("summonerId");

-- AddForeignKey
ALTER TABLE "RankedTFT" ADD CONSTRAINT "RankedTFT_summonerId_fkey" FOREIGN KEY ("summonerId") REFERENCES "TFTUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
