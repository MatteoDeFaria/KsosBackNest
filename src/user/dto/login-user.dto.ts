import { Expose, Exclude } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @Expose()
  @IsDefined()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @Expose()
  @Exclude({ toPlainOnly: true })
  @IsDefined()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password: string;
}
