/*
  Warnings:

  - You are about to drop the column `summonerId` on the `RankedTFT` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[puuid]` on the table `RankedTFT` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `puuid` to the `RankedTFT` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RankedTFT" DROP CONSTRAINT "RankedTFT_summonerId_fkey";

-- DropIndex
DROP INDEX "RankedTFT_summonerId_key";

-- AlterTable
ALTER TABLE "RankedTFT" DROP COLUMN "summonerId",
ADD COLUMN     "puuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RankedTFT_puuid_key" ON "RankedTFT"("puuid");

-- AddForeignKey
ALTER TABLE "RankedTFT" ADD CONSTRAINT "RankedTFT_puuid_fkey" FOREIGN KEY ("puuid") REFERENCES "TFTUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
