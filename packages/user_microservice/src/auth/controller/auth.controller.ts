import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { auth, AUTH_SERVICE_NAME } from '../auth.pb';
import {
  SignInRequestDto,
  SignUpRequestDto,
  ValidateRequestDto,
} from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';

@Controller()
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @GrpcMethod(AUTH_SERVICE_NAME, 'SignUp')
  private signUp(payload: SignUpRequestDto): Promise<auth.SignUpResponse> {
    return this.service.signUp(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'SignIn')
  private singIn(payload: SignInRequestDto): Promise<auth.SignInResponse> {
    return this.service.signIn(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Validate')
  private validate(
    payload: ValidateRequestDto,
  ): Promise<auth.ValidateResponse> {
    return this.service.validate(payload);
  }
}
