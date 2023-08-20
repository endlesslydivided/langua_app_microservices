import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';

import { auth } from '../../langua_proto/auth.pb';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  
  constructor(private service: AuthService) {
    
  }

  public async canActivate(ctx: ExecutionContext) {
    const req: Request = ctx.switchToHttp().getNext().req;
    const accessToken: string = req['accessToken'];

    if (!accessToken) {
      throw new UnauthorizedException("Access token is not provided");
    }

    const { status, userId }: auth.ValidateResponse = await this.service.validate(accessToken);

    req['user'] = userId;

    if (status !== HttpStatus.OK) {
      throw new UnauthorizedException("Validation is not passed");
    }

    return true;
  }
}
