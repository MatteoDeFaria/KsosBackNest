import { RankedTFT } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class TftRankedEntinty implements RankedTFT {
  constructor(partial: Partial<TftRankedEntinty>) {
    Object.assign(this, partial);
  }

  @Exclude()
  id: number;

  @Exclude()
  puuid: string;

  @Exclude()
  summonerId: string;

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
