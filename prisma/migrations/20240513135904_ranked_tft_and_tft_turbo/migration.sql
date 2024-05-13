-- CreateTable
CREATE TABLE "RankedTurboTFT" (
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

    CONSTRAINT "RankedTurboTFT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RankedTFT" (
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

    CONSTRAINT "RankedTFT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TFTUser" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "puuid" TEXT NOT NULL,
    "profileIconId" INTEGER NOT NULL,
    "revisionDate" BIGINT NOT NULL,
    "summonerLevel" BIGINT NOT NULL,
    "gameName" TEXT NOT NULL,
    "tagLine" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TFTUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RankedTurboTFT_summonerId_key" ON "RankedTurboTFT"("summonerId");

-- CreateIndex
CREATE UNIQUE INDEX "RankedTurboTFT_leagueId_key" ON "RankedTurboTFT"("leagueId");

-- CreateIndex
CREATE UNIQUE INDEX "RankedTFT_summonerId_key" ON "RankedTFT"("summonerId");

-- CreateIndex
CREATE UNIQUE INDEX "RankedTFT_leagueId_key" ON "RankedTFT"("leagueId");

-- CreateIndex
CREATE UNIQUE INDEX "TFTUser_id_key" ON "TFTUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TFTUser_puuid_key" ON "TFTUser"("puuid");

-- AddForeignKey
ALTER TABLE "RankedTurboTFT" ADD CONSTRAINT "RankedTurboTFT_summonerId_fkey" FOREIGN KEY ("summonerId") REFERENCES "TFTUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankedTFT" ADD CONSTRAINT "RankedTFT_summonerId_fkey" FOREIGN KEY ("summonerId") REFERENCES "TFTUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
