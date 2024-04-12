import { Expose } from 'class-transformer';
import {
  IsAlphanumeric,
  IsDefined,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @Expose()
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(16)
  @ApiProperty({
    example: 'lepetitmattos',
    description: 'The riot game name of the user',
  })
  gameName: string;

  @Expose()
  @IsDefined()
  @IsString()
  @IsAlphanumeric()
  @MinLength(3)
  @MaxLength(5)
  @ApiProperty({
    example: 'KSOS',
    description: 'The Riot tag line of the user',
  })
  tagLine: string;
}
