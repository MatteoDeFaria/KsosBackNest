//import { ApiProperty } from '@nestjs/swagger';
import { LeagueOfLegend } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class LeagueOfLegendEntity implements LeagueOfLegend {
  constructor(partial: Partial<LeagueOfLegendEntity>) {
    Object.assign(this, partial);
  }

  @Exclude()
  id: number;

  leagueId: string;

  queueType: string;

  tier: string;

  rank: string;

  @Exclude()
  summonerId: string;

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
