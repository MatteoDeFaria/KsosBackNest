import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LolService } from './lol.service';
import { CreateLeagueUserDto } from './dto/create-user.dto';

enum QueueType {
  SoloQueue = 'RANKED_SOLO_5x5',
  FlexQueue = 'RANKED_FLEX_SR',
}

@ApiTags('League of Legends')
@Controller('lol')
export class LolController {
  constructor(private lolService: LolService) {}

  @Post('/user')
  @ApiOperation({ summary: 'Create lol user' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiCreatedResponse({
    description: 'User created',
  })
  createUser(@Body() createUserDto: CreateLeagueUserDto) {
    return this.lolService.createUser(createUserDto);
  }

  @Get('/leaderboard/:queueType')
  @ApiOperation({ summary: 'Get lol leaderboard' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiParam({ name: 'queueType', enum: QueueType })
  getLeaderboard(@Param('queueType') queueType: QueueType) {
    return this.lolService.getLeaderboard(queueType);
  }
}
