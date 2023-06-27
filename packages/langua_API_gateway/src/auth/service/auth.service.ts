import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { auth, AUTH_SERVICE_NAME } from '../../langua_proto/auth.pb';

@Injectable()
export class AuthService {
  private authServiceClient: auth.AuthService;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.authServiceClient =
      this.client.getService<auth.AuthService>(AUTH_SERVICE_NAME);
  }

  public async validate(token: string): Promise<auth.ValidateResponse> {
    return firstValueFrom(this.authServiceClient.validate({ token }));
  }
}
