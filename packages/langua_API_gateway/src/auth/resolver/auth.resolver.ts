import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { AuthService } from '../service/auth.service';
import { SignInResponse, SignUpResponse } from '../model/auth.model';
import { SingInInput, SingUpInput } from '../inputs/auth.inputs';
import { User } from '../model/user.model';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => SignUpResponse,{name:'signUp'})
  @UseGuards(AuthGuard)
  async signUp(@Args('signUp') input: SingUpInput) {
    const result = await this.authService.signUp(input);
    return {
      status: result.status,
      error: result.error
    };
  }

  @Mutation((returns) => SignInResponse,{name:'signIn'})
  @UseGuards(AuthGuard)
  async signIn(@Args('signIn') input: SingInInput)
  {
    const result = await this.authService.singIn(input);
    return {
      status: result.status,
      error: result.error,
      data: result.token
    }
  }
}
