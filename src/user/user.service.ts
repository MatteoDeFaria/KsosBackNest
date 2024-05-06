import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UserEntity } from './entities/user.entity';
import { PatchUserDto } from './dto/patch-user.dto';

@Injectable()
export class UserService {
  private saltRound: string = process.env.SALT_ROUND;
  constructor(private prisma: PrismaService) {}

  private async cryptPassword(password: string): Promise<string> {
    return await hash(password, Number(this.saltRound));
  }

  async createUser(data: Prisma.UserCreateInput): Promise<UserEntity> {
    data.password = await this.cryptPassword(data.password);
    return new UserEntity(await this.prisma.user.create({ data }));
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

  async deleteUser(id: string, data: DeleteUserDto): Promise<UserEntity> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id },
    });

    if (!user)
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);

    const areEqual = await compare(data.password, user.password);

    if (!areEqual)
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);

    return new UserEntity(
      await this.prisma.user.delete({
        where: {
          email: data.email,
        },
      }),
    );
  }

  async getUser(userEmail: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        email: userEmail,
      },
    });

    return new UserEntity(user);
  }

  async getUserById(userId: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    return new UserEntity(user);
  }

  async updateUser(id: string, data: PatchUserDto): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    return new UserEntity(user);
  }
}
