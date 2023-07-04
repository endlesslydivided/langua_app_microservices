import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { BadRequestException, HttpStatus } from '@nestjs/common';
import { SignInInput, SignUpInput } from '../inputs/auth.inputs';
import { SignInResponse } from '../model/auth.model';
import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';
import { Void } from '../../share/scalar/void.scalar';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => Void,{name:'signUp'})
  async signUp(@Args('signUp') input: SignUpInput) {
    const result = await this.authService.signUp(input);

    if(result.status !== HttpStatus.OK && result.status !== HttpStatus.CREATED)
    {
      throw new BadRequestException(result.error)
    }
    
    return;
  }

  @Mutation((returns) => SignInResponse,{name:'signIn'})
  async signIn(@Args('signIn') input: SignInInput)
  {
    const result = await this.authService.singIn(input);

    if(result.status !== HttpStatus.OK)
    {
      throw new BadRequestException(result.error)
    }

    return {
      accessToken: result.token
    }
  }
}
