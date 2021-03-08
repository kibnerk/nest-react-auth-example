import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import { UserDto, CreateUserDto } from './dto/user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { User } from './user.decorator';
import { UserService } from './user.service';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/users')
  GetUsers() {
    const users = this.userService.getUsers();
    return users;
  }

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  GetUser(@User() user: UserDto) {
    return this.userService.getUser(user.id);
  }

  @Post('/create')
  @ApiBody({ type: UserDto })
  CreateUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user.name, user.password, user.avatar);
  }
}
