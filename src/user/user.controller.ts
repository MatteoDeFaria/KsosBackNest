import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { PatchUserDto } from './dto/patch-user.dto';
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
  @ApiOkResponse({
    description: 'User logged',
    type: UserEntity,
  })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOkResponse({
    description: 'User deleted',
    type: UserEntity,
  })
  deleteUser(@Param('id') id: string, @Body() deleteUserDto: DeleteUserDto) {
    return this.userService.deleteUser(id, deleteUserDto);
  }

  @Get(':email')
  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOkResponse({
    description: 'User retrieved',
    type: UserEntity,
  })
  getUser(@Param('email') userEmail: string) {
    return this.userService.getUser(userEmail);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOkResponse({
    description: 'User retrieved',
    type: UserEntity,
  })
  getId(@Param('id') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch user by id' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOkResponse({
    description: 'User updated',
    type: UserEntity,
  })
  patchUser(@Param('id') id: string, @Body() data: PatchUserDto) {
    return this.userService.updateUser(id, data);
  }
}
