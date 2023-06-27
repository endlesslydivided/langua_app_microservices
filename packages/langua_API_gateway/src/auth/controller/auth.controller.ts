import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  Put,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { auth, AUTH_SERVICE_NAME } from '../../langua_proto/auth.pb';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private authServiceClient: auth.AuthService;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.authServiceClient =
      this.client.getService<auth.AuthService>(AUTH_SERVICE_NAME);
  }

  @Post('/signUp')
  private async signUp(
    @Body() body: auth.SignUpRequest,
  ): Promise<Observable<auth.SignUpResponse>> {
    return this.authServiceClient.signUp(body);
  }

  @Put('/signIn')
  private async login(
    @Body() body: auth.SignInRequest,
  ): Promise<Observable<auth.SignInResponse>> {
    return this.authServiceClient.signIn(body);
  }
}
