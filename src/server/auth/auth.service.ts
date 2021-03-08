import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { UserService } from '../user/user.service';

const EXPIRES_TIME = 60 * 50;
const EXPIRES_REFRESH_TIME = '30d';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  private refreshTokens = [];

  getNewToken(refreshToken) {
    let newRefresh;
    const isValidRefresh = this.refreshTokens.find(
      ({ token }) => token === refreshToken,
    );
    const timeNow = Math.round(new Date().getTime() / 1000);

    const userId = isValidRefresh?.userId;
    const user = this.userService.users.find(user => user.id === userId);

    if (isValidRefresh) {
      newRefresh = sign(
        {
          id: userId,
        },
        process.env.AUTH_SECRET_REFRESH,
        { expiresIn: '30d' },
      );

      this.refreshTokens = this.refreshTokens.filter(
        ({ token }) => token !== refreshToken,
      );

      this.refreshTokens.push({
        userId: userId,
        token: newRefresh,
      });

      return {
        token: sign(
          {
            id: userId,
            name: user.name,
          },
          process.env.AUTH_SECRET,
          { expiresIn: EXPIRES_TIME },
        ),
        refreshToken: newRefresh,
        expiresIn: timeNow + EXPIRES_TIME,
      };
    } else {
      throw new UnauthorizedException('invalid refresh token');
    }
  }

  getToken(name: string, pass: string) {
    const user = this.userService.users.find(
      user => user.name === name && user.password === pass,
    );
    const timeNow = Math.round(new Date().getTime() / 1000);

    let refreshToken;

    if (user) {
      refreshToken = sign(
        {
          id: user.id,
        },
        process.env.AUTH_SECRET_REFRESH,
        { expiresIn: EXPIRES_REFRESH_TIME },
      );

      this.refreshTokens.push({
        userId: user.id,
        token: refreshToken,
      });
    } else {
      throw new BadRequestException(`Invalid username or password`);
    }

    return {
      token: sign(
        {
          id: user.id,
          name: user.name,
        },
        process.env.AUTH_SECRET,
        { expiresIn: EXPIRES_TIME },
      ),
      refreshToken,
      expiresIn: timeNow + EXPIRES_TIME,
    };
  }
}
