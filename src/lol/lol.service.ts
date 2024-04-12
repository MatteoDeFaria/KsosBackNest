import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LeagueUserEntity } from './entities/league-user.entity';

@Injectable()
export class LolService {
  constructor(
    private readonly httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  private readonly logger = new Logger(LolService.name);

  async createUser(data: CreateUserDto): Promise<LeagueUserEntity> {
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
}
