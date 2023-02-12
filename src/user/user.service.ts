import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  private salt: string = process.env.HASH;
  constructor(private prisma: PrismaService) {}

  private async cryptPassword(password: string): Promise<string> {
    return await hash(password, this.salt);
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    data.password = await this.cryptPassword(data.password);
    return this.prisma.user.create({ data });
  }

  async loginUser(data: LoginUserDto): Promise<string> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        email: data.email,
      },
    });

    if (!user)
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);

    const areEqual = await compare(data.password, user.password);

    if (!areEqual)
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);

    return user.id;
  }
}
