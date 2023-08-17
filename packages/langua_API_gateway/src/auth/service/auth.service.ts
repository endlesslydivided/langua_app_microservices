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

  public async validate(accessToken: string): Promise<auth.ValidateResponse> {
    return firstValueFrom(this.authServiceClient.validate({ accessToken }));
  }

  public async refresh(refreshToken: string): Promise<auth.RefreshResponse> {
    return firstValueFrom(this.authServiceClient.refresh({refreshToken}));
  }

  public async signUp(data: auth.SignUpRequest): Promise<auth.SignUpResponse> {
    return firstValueFrom(this.authServiceClient.signUp(data));
  }

  public async singIn(data: auth.SignInRequest): Promise<auth.SignInResponse> {
    return firstValueFrom(this.authServiceClient.signIn(data));
  }

}
