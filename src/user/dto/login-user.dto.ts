import { Expose, Exclude } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @Expose()
  @IsDefined()
  @IsEmail()
  @MaxLength(100)
  @ApiProperty({
    example: 'matteo@gmail.com',
    description: 'The email of the user',
  })
  email: string;

  @Expose()
  @Exclude({ toPlainOnly: true })
  @IsDefined()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @ApiProperty({
    example: '$password$',
    description: 'The password of the user',
  })
  password: string;
}
