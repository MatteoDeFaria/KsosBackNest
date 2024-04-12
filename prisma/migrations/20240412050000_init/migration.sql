-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeagueOfLegend" (
    "id" SERIAL NOT NULL,
    "leagueId" TEXT NOT NULL,
    "queueType" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "summonerId" TEXT NOT NULL,
    "leaguePoints" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "veteran" BOOLEAN NOT NULL,
    "inactive" BOOLEAN NOT NULL,
    "freshBlood" BOOLEAN NOT NULL,
    "hotStreak" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeagueOfLegend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeagueUser" (
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

    CONSTRAINT "LeagueUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "LeagueOfLegend_leagueId_key" ON "LeagueOfLegend"("leagueId");

-- CreateIndex
CREATE UNIQUE INDEX "LeagueUser_id_key" ON "LeagueUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LeagueUser_puuid_key" ON "LeagueUser"("puuid");

-- AddForeignKey
ALTER TABLE "LeagueOfLegend" ADD CONSTRAINT "LeagueOfLegend_summonerId_fkey" FOREIGN KEY ("summonerId") REFERENCES "LeagueUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
