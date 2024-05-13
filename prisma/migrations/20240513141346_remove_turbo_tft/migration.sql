/*
  Warnings:

  - You are about to drop the `RankedTurboTFT` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RankedTurboTFT" DROP CONSTRAINT "RankedTurboTFT_summonerId_fkey";

-- DropTable
DROP TABLE "RankedTurboTFT";
