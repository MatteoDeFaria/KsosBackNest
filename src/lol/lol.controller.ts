import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LolService } from './lol.service';
import { CreateUserDto } from './dto/create-user.dto';

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
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.lolService.createUser(createUserDto);
  }

  @Get('/leaderboard')
  @ApiOperation({ summary: 'Get lol leaderboard' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  getLeeaderboard() {
    return this.lolService.getLeaderboard();
  }
}
