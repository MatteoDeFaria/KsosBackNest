import { Body, Controller, Post, Delete, Get, Param } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiCreatedResponse({
    description: 'User created',
    type: UserEntity,
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiCreatedResponse({
    description: 'User logged',
    type: UserEntity,
  })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }

  @Delete('/delete')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiCreatedResponse({
    description: 'User deleted',
    type: UserEntity,
  })
  deleteUser(@Body() deleteUserDto: DeleteUserDto) {
    return this.userService.deleteUser(deleteUserDto);
  }

  @Get('/email/:email')
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiCreatedResponse({
    description: 'User retrieved',
    type: UserEntity,
  })
  getUser(@Param('email') userEmail: string) {
    return this.userService.getUser(userEmail);
  }
}
