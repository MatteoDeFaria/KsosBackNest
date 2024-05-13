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

  async createLolUser(
    data: CreateLeagueUserDto,
    puuid: string,
  ): Promise<LeagueUserEntity> {
    const getUserData = await firstValueFrom(
      this.httpService
        .get(
          `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.RIOT_API_KEY}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened to fetch LoL!';
          }),
        ),
    ).then((res) => res.data);

    return new LeagueUserEntity(
      await this.prisma.leagueUser.upsert({
        where: { id: getUserData.id },
        create: {
          id: getUserData.id,
          accountId: getUserData.accountId,
          puuid: getUserData.puuid,
          profileIconId: getUserData.profileIconId,
          revisionDate: getUserData.revisionDate,
          summonerLevel: getUserData.summonerLevel,
          gameName: data.gameName,
          tagLine: data.tagLine,
        },
        update: {
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

  async createTftUser(
    data: CreateLeagueUserDto,
    puuid: string,
  ): Promise<LeagueUserEntity> {
    const getUserData = await firstValueFrom(
      this.httpService
        .get(
          `https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${puuid}?api_key=${process.env.TFT_KEY}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened to fetch tft!';
          }),
        ),
    ).then((res) => res.data);

    return new LeagueUserEntity(
      await this.prisma.tFTUser.upsert({
        where: { id: getUserData.id },
        create: {
          id: getUserData.id,
          accountId: getUserData.accountId,
          puuid: getUserData.puuid,
          profileIconId: getUserData.profileIconId,
          revisionDate: getUserData.revisionDate,
          summonerLevel: getUserData.summonerLevel,
          gameName: data.gameName,
          tagLine: data.tagLine,
        },
        update: {
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

  async createUser(data: CreateLeagueUserDto): Promise<LeagueUserEntity[]> {
    const apiKeys: string[] = [process.env.RIOT_API_KEY, process.env.TFT_KEY];
    const users: LeagueUserEntity[] = [];

    apiKeys.forEach(async (element) => {
      const getPuuid = await firstValueFrom(
        this.httpService
          .get(
            `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${data.gameName}/${data.tagLine}?api_key=${element}`,
          )
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.response.data);
              throw 'An error happened!';
            }),
          ),
      ).then((res) => res.data);

      if (element === process.env.RIOT_API_KEY)
        users.push(await this.createLolUser(data, getPuuid.puuid));
      else users.push(await this.createTftUser(data, getPuuid.puuid));
    });

    return users;
  }

  async getLeaderboard(queueType: string): Promise<RankedEntity[]> {
    const allLeagueUser = await this.prisma.leagueUser.findMany({
      include: {
        RankedFlex: true,
        RankedSolo: true,
      },
    });

    const allTFTUser = await this.prisma.tFTUser.findMany({
      include: {
        RankedTFT: true,
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

    allTFTUser.forEach((element) => {
      if (queueType === 'RANKED_TFT') {
        const newLeagueOfLegends: RankedEntity = element.RankedTFT;

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
