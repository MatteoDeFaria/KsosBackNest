import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class TasksService {
  constructor(
    private readonly httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  private readonly logger = new Logger(TasksService.name);

  async upsertData(data: Prisma.RankedSoloCreateInput[], summonerId: string) {
    data.forEach(async (element) => {
      if (element.queueType === 'RANKED_SOLO_5x5')
        await this.prisma.rankedSolo.upsert({
          create: element,
          update: element,
          where: {
            summonerId,
          },
        });
      else
        await this.prisma.rankedFlex.upsert({
          create: element,
          update: element,
          where: {
            summonerId,
          },
        });
    });
  }

  @Cron('0 * * * *')
  async getDataRanked() {
    const users: Prisma.LeagueUserCreateInput[] =
      await this.prisma.leagueUser.findMany();

    users.forEach(async (element: Prisma.LeagueUserCreateInput) => {
      const rankedData: Prisma.RankedSoloCreateInput[] = await firstValueFrom(
        this.httpService
          .get(
            `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${element.id}?api_key=${process.env.RIOT_API_KEY}`,
          )
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.response.data);
              throw 'An error happened!';
            }),
          ),
      ).then((res) => res.data);

      await this.upsertData(rankedData, element.id);
    });

    this.logger.debug(`Called when the minute is 0`);
  }
}
