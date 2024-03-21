import { ApiProperty } from '@nestjs/swagger';

export class User {
  /**
   * The name of the Cat
   * @example Matteo
   */

  @ApiProperty({
    example: '21e26b44-084d-4194-b4d8-10522b57334f',
    description: 'The id of the user',
  })
  id: string;

  @ApiProperty({
    example: 'matteo@gmail.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({ example: 'Matteo', description: 'The username of the user' })
  username: string;
}
