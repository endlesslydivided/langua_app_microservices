import { Args, Context, GraphQLExecutionContext, Mutation, Resolver } from '@nestjs/graphql';

import { BadRequestException, HttpStatus, UseGuards } from '@nestjs/common';
import { RefreshInput, SignInInput, SignUpInput } from '../inputs/auth.inputs';
import { RefreshResponse, SignInResponse, SignOutResponse, SignUpResponse } from '../model/auth.model';
import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';
import { Void } from '../../share/scalar/void.scalar';
import { Request, Response } from 'express';
import { RefreshGuard } from '../guard/refresh.guard';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => SignUpResponse,{name:'signUp'})
  async signUp(@Args('signUp') input: SignUpInput) {
    try
    {
      const result = await this.authService.signUp(input);

      if(result.status !== HttpStatus.OK && result.status !== HttpStatus.CREATED)
      {
        throw new BadRequestException(result.error)
      }
      
      return result;
    }
    catch(error)
    {
      throw new BadRequestException();
    }
   
  }

  @Mutation((returns) => SignInResponse,{name:'signIn'})
  async signIn(
    @Context() context: GraphQLExecutionContext & {req:Request},
    @Args('signIn') input: SignInInput)
  {
    try
    {
      const result = await this.authService.singIn(input);

      if(result.status !== HttpStatus.OK)
      {
        throw new BadRequestException(result.error)
      }

      const response: Response = context.req.res;

      response.cookie("accessToken",result.accessToken,
      {maxAge: Number(process.env.ACCESS_TOKEN_EXPIRE),httpOnly:true, secure:true, sameSite:"lax"});

      response.cookie("refreshToken",result.refreshToken,
      {maxAge: Number(process.env.REFRESH_TOKEN_EXPIRE),httpOnly:true, secure:true, sameSite:"lax"});

      return {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      }
    }
    catch(error)
    {
      throw new BadRequestException();
    }
  }

  @Mutation((returns) => RefreshResponse,{name:'refresh'})
  @UseGuards(RefreshGuard)
  async refreshToken(
    @Context() context: GraphQLExecutionContext,
    @Args('refresh') input: RefreshInput)
  {
    try
    {
      const result = await this.authService.refresh(input.refreshToken);

      if(result.status !== HttpStatus.OK)
      {
        throw new BadRequestException(result.error)
      }

      const response:Response = context.switchToHttp().getResponse<Response>();

      response.cookie("accessToken",result.accessToken,
      {maxAge: Number(process.env.ACCESS_TOKEN_EXPIRE),httpOnly:true, secure:true, sameSite:"lax"});

      response.cookie("refreshToken",result.refreshToken,
      {maxAge: Number(process.env.REFRESH_TOKEN_EXPIRE),httpOnly:true, secure:true, sameSite:"lax"});

      return {
        accessToken: result.accessToken
      }
    }
    catch(error)
    {
      throw new BadRequestException();
    }
  }

  @Mutation((returns) => SignOutResponse,{name:'signOut'})
  async signOut(
    @Context() context: GraphQLExecutionContext)
  {
    try
    {
      const response:Response = context.switchToHttp().getResponse<Response>();

      response.cookie("accessToken",
      {maxAge: 0,httpOnly:true, secure:true, sameSite:"lax"});

      response.cookie("refreshToken",
      {maxAge: 0,httpOnly:true, secure:true, sameSite:"lax"});

      return {
        status: HttpStatus.OK
      }
    }
    catch(error)
    {
      throw new BadRequestException();
    }
  }
}
