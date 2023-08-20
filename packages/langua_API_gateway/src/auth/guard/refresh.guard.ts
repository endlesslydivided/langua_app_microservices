import {
  CanActivate,
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import { Request } from 'express';


@Injectable()
export class RefreshGuard implements CanActivate {

  public async canActivate(ctx: ExecutionContext){
    const req: Request = ctx.switchToHttp().getNext().req;
    const refreshToken: string = req['refreshToken'];

    return !!refreshToken;
  }
}
