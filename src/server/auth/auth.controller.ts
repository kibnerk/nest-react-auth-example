import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthUserDto } from '../user/dto/user.dto';
import { RefreshDto } from './dto/auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/refresh')
  getNewToken(@Body() data: RefreshDto) {
    return this.authService.getNewToken(data.refresh);
  }

  @Post('/login')
  PostToken(@Body() CreateToken: AuthUserDto) {
    return this.authService.getToken(CreateToken.name, CreateToken.password);
  }
}
