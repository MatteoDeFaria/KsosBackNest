import { ApiProperty } from '@nestjs/swagger';
import { LeagueUser } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class LeagueUserEntity implements LeagueUser {
  constructor(partial: Partial<LeagueUserEntity>) {
    Object.assign(this, partial);
  }

  id: string;
  accountId: string;
  @ApiProperty({
    example: '21e26b44-084d-4194-b4d8-10522b57334f',
    description: 'The id of the user',
  })
  puuid: string;
  profileIconId: number;

  @Exclude()
  revisionDate: bigint;

  @Exclude()
  summonerLevel: bigint;
  gameName: string;
  tagLine: string;
  createdAt: Date;
  updateAt: Date;
}
