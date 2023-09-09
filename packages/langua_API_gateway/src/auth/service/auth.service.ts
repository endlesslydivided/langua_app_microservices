import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { auth, AUTH_SERVICE_NAME } from '../../langua_proto/auth.pb';

@Injectable()
export class AuthService {
  private userServiceClient: auth.AuthService;

  constructor(@Inject(AUTH_SERVICE_NAME) private  client: ClientGrpc) {
    
  }

  public onModuleInit(): void {
    this.userServiceClient =
      this.client.getService<auth.AuthService>(AUTH_SERVICE_NAME);
  }

  public async validate(accessToken: string): Promise<auth.ValidateResponse> {
    return firstValueFrom(this.userServiceClient.validate({ accessToken }));
  }

  public async refresh(refreshToken: string): Promise<auth.RefreshResponse> {
    return firstValueFrom(this.userServiceClient.refresh({refreshToken}));
  }

  public async signUp(data: auth.SignUpRequest): Promise<auth.SignUpResponse> {
    return firstValueFrom(this.userServiceClient.signUp(data));
  }

  public async singIn(data: auth.SignInRequest): Promise<auth.SignInResponse> {
    return firstValueFrom(this.userServiceClient.signIn(data));
  }

}
