import { Expose, Exclude } from 'class-transformer';
import {
  IsAlphanumeric,
  IsDefined,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @Expose()
  @IsDefined()
  @IsEmail()
  @MaxLength(100)
  @ApiProperty()
  @ApiProperty({
    example: 'matteo@gmail.com',
    description: 'The email of the user',
  })
  email: string;

  @Expose()
  @IsDefined()
  @IsString()
  @IsAlphanumeric()
  @MaxLength(100)
  @ApiProperty({ example: 'Matteo', description: 'The username of the user' })
  username: string;

  @Expose()
  @Exclude({ toPlainOnly: true })
  @IsDefined()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @ApiProperty()
  @ApiProperty({
    example: '$password$',
    description: 'The password of the user',
  })
  password: string;
}
