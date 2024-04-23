/*
  Warnings:

  - You are about to drop the `LeagueOfLegend` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LeagueOfLegend" DROP CONSTRAINT "LeagueOfLegend_summonerId_fkey";

-- DropTable
DROP TABLE "LeagueOfLegend";

-- CreateTable
CREATE TABLE "RankedSolo" (
    "id" SERIAL NOT NULL,
    "summonerId" TEXT NOT NULL,
    "leagueId" TEXT NOT NULL,
    "queueType" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "leaguePoints" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "veteran" BOOLEAN NOT NULL,
    "inactive" BOOLEAN NOT NULL,
    "freshBlood" BOOLEAN NOT NULL,
    "hotStreak" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RankedSolo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RankedFlex" (
    "id" SERIAL NOT NULL,
    "summonerId" TEXT NOT NULL,
    "leagueId" TEXT NOT NULL,
    "queueType" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "leaguePoints" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "veteran" BOOLEAN NOT NULL,
    "inactive" BOOLEAN NOT NULL,
    "freshBlood" BOOLEAN NOT NULL,
    "hotStreak" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RankedFlex_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RankedSolo_summonerId_key" ON "RankedSolo"("summonerId");

-- CreateIndex
CREATE UNIQUE INDEX "RankedSolo_leagueId_key" ON "RankedSolo"("leagueId");

-- CreateIndex
CREATE UNIQUE INDEX "RankedFlex_summonerId_key" ON "RankedFlex"("summonerId");

-- CreateIndex
CREATE UNIQUE INDEX "RankedFlex_leagueId_key" ON "RankedFlex"("leagueId");

-- AddForeignKey
ALTER TABLE "RankedSolo" ADD CONSTRAINT "RankedSolo_summonerId_fkey" FOREIGN KEY ("summonerId") REFERENCES "LeagueUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankedFlex" ADD CONSTRAINT "RankedFlex_summonerId_fkey" FOREIGN KEY ("summonerId") REFERENCES "LeagueUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
