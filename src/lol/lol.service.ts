import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { PrismaService } from 'src/prisma.service';
import { CreateLeagueUserDto } from './dto/create-user.dto';
import { LeagueUserEntity } from './entities/league-user.entity';
import { RankedEntity } from './entities/league-ranked.entity';

enum RANK {
  'IRON',
  'BRONZE',
  'SILVER',
  'GOLD',
  'PLATINUM',
  'EMERALD',
  'DIAMOND',
  'MASTER',
  'GRANDMASTER',
  'CHALLENGER',
}

enum PALIER {
  'IV',
  'III',
  'II',
  'I',
}

@Injectable()
export class LolService {
  constructor(
    private readonly httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  private readonly logger = new Logger(LolService.name);

  async createUser(data: CreateLeagueUserDto): Promise<LeagueUserEntity> {
    const getPuuid = await firstValueFrom(
      this.httpService
        .get(
          `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${data.gameName}/${data.tagLine}?api_key=${process.env.RIOT_API_KEY}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    ).then((res) => res.data);

    const getUserData = await firstValueFrom(
      this.httpService
        .get(
          `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${getPuuid.puuid}?api_key=${process.env.RIOT_API_KEY}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    ).then((res) => res.data);

    return new LeagueUserEntity(
      await this.prisma.leagueUser.create({
        data: {
          id: getUserData.id,
          accountId: getUserData.accountId,
          puuid: getUserData.puuid,
          profileIconId: getUserData.profileIconId,
          revisionDate: getUserData.revisionDate,
          summonerLevel: getUserData.summonerLevel,
          gameName: data.gameName,
          tagLine: data.tagLine,
        },
      }),
    );
  }

  async getLeaderboard(queueType: string): Promise<RankedEntity[]> {
    const allLeagueUser = await this.prisma.leagueUser.findMany({
      include: {
        RankedFlex: true,
        RankedSolo: true,
      },
    });

    const tabLeagueRanked: RankedEntity[] = [];

    allLeagueUser.forEach((element) => {
      if (queueType === 'RANKED_SOLO_5x5') {
        const newLeagueOfLegends: RankedEntity = element.RankedSolo;

        newLeagueOfLegends.gameName = element.gameName;
        newLeagueOfLegends.tagLine = element.tagLine;
        tabLeagueRanked.push(new RankedEntity(newLeagueOfLegends));
      } else if (queueType === 'RANKED_FLEX_SR') {
        const newLeagueOfLegends: RankedEntity = element.RankedFlex;

        newLeagueOfLegends.gameName = element.gameName;
        newLeagueOfLegends.tagLine = element.tagLine;
        tabLeagueRanked.push(new RankedEntity(newLeagueOfLegends));
      }
    });

    tabLeagueRanked.sort((a, b) => {
      if (RANK[a.tier] !== RANK[b.tier]) return RANK[a.tier] - RANK[b.tier];
      if (PALIER[a.rank] !== PALIER[b.rank])
        return PALIER[a.rank] - PALIER[b.rank];
      if (a.leaguePoints !== b.leaguePoints)
        return a.leaguePoints - b.leaguePoints;
    });

    tabLeagueRanked.reverse();
    return tabLeagueRanked;
  }
}
