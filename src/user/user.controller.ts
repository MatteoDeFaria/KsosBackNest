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
import { User } from './entities/user.entity';

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiCreatedResponse({
    description: 'User created',
    type: User,
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiCreatedResponse({
    description: 'User logged',
    type: User,
  })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }

  @Delete('/delete')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiCreatedResponse({
    description: 'User deleted',
    type: User,
  })
  deleteUser(@Body() deleteUserDto: DeleteUserDto) {
    return this.userService.deleteUser(deleteUserDto);
  }

  @Get('/email/:email')
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiCreatedResponse({
    description: 'User retrieved',
    type: User,
  })
  getUser(@Param('email') userEmail: string) {
    console.log('pute');
    return this.userService.getUser(userEmail);
  }
}
