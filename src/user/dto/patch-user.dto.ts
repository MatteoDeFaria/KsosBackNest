// import { Expose, Exclude } from 'class-transformer';
// import {
//   IsAlphanumeric,
//   IsDefined,
//   IsEmail,
//   IsString,
//   MaxLength,
//   MinLength,
//   ValidateIf,
// } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

// export class PatchUserDto {
//   @Expose()
//   @IsDefined()
//   @IsString()
//   @IsAlphanumeric()
//   @ValidateIf((object, value) => value !== undefined)
//   @ApiProperty({
//     example: '21e26b44-084d-4194-b4d8-10522b57334f',
//     description: 'The id of the user',
//   })
//   id: string;

//   @Expose()
//   @IsDefined()
//   @IsEmail()
//   @MaxLength(100)
//   @ValidateIf((object, value) => value !== undefined)
//   @ApiProperty({
//     example: 'matteo@gmail.com',
//     description: 'The email of the user',
//   })
//   email?: string;

//   @Expose()
//   @IsDefined()
//   @IsString()
//   @IsAlphanumeric()
//   @MaxLength(100)
//   @ValidateIf((object, value) => value !== undefined)
//   @ApiProperty({ example: 'Matteo', description: 'The username of the user' })
//   username?: string;

//   @Expose()
//   @Exclude({ toPlainOnly: true })
//   @IsDefined()
//   @IsString()
//   @MinLength(8)
//   @MaxLength(100)
//   @ApiProperty({
//     example: '$password$',
//     description: 'The password of the user',
//   })
//   password?: string;
// }
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class PatchUserDto extends PartialType(CreateUserDto) {}
