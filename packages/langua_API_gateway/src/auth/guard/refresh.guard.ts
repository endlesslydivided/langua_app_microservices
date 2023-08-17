import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable
} from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from '../service/auth.service';

@Injectable()
export class RefreshGuard implements CanActivate {

  @Inject(AuthService)
  public readonly service: AuthService;

  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const req: Request = ctx.switchToHttp().getNext().req;
    const refreshToken: string = req['refreshToken'];

    
    return !!refreshToken;
  }
}
