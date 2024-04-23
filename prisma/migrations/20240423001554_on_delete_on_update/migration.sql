-- DropForeignKey
ALTER TABLE "LeagueOfLegend" DROP CONSTRAINT "LeagueOfLegend_summonerId_fkey";

-- AddForeignKey
ALTER TABLE "LeagueOfLegend" ADD CONSTRAINT "LeagueOfLegend_summonerId_fkey" FOREIGN KEY ("summonerId") REFERENCES "LeagueUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
