import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyToken } from '../scripts/helpers';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token: string = req.get('authorization');
    const user = verifyToken(token);

    if (user.error) {
      throw new UnauthorizedException(user?.error?.message);
    }

    return (req.user = user);
  }
}
