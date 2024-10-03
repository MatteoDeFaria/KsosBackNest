//import { ApiProperty } from '@nestjs/swagger';
import { RankedSolo } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class RankedEntity implements RankedSolo {
  constructor(partial: Partial<RankedEntity>) {
    Object.assign(this, partial);
  }

  @Exclude()
  id: number;

  @Exclude()
  summonerId: string;

  puuid?: string;

  profileIconId?: number;

  leagueId: string;

  queueType: string;

  tier: string;

  rank: string;

  leaguePoints: number;

  wins: number;

  losses: number;

  @Exclude()
  veteran: boolean;

  @Exclude()
  inactive: boolean;

  @Exclude()
  freshBlood: boolean;

  @Exclude()
  hotStreak: boolean;

  gameName?: string;

  tagLine?: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updateAt: Date;
}
