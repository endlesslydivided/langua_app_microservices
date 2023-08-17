import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { auth } from '../../langua_proto/auth.pb';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  @Inject(AuthService)
  public readonly service: AuthService;

  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const req: Request = ctx.switchToHttp().getNext().req;
    const accessToken: string = req['accessToken'];

    if (!accessToken) {
      throw new UnauthorizedException();
    }

    const { status, userId }: auth.ValidateResponse = await this.service.validate(accessToken);

    req['user'] = userId;

    if (status !== HttpStatus.OK) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
