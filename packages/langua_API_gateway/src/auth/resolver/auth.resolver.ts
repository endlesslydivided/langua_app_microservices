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
    @Context() context: GraphQLExecutionContext & {req:Request, res:Response},
    @Args('signIn') input: SignInInput)
  {
    try
    {
      const result = await this.authService.singIn(input);

      if(result.status !== HttpStatus.OK)
      {
        throw new BadRequestException(result.error)
      }


      context.res.cookie("accessToken",result.accessToken,
      {maxAge: Number(process.env.ACCESS_TOKEN_EXPIRE),secure:true, sameSite:"lax"});

      context.res.cookie("refreshToken",result.refreshToken,
      {maxAge: Number(process.env.REFRESH_TOKEN_EXPIRE), secure:true, sameSite:"lax"});

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
    @Context() context: GraphQLExecutionContext & {req:Request, res:Response},)
  {
    try
    {
      const result = await this.authService.refresh(context.req['refreshToken']);

      if(result.status !== HttpStatus.OK)
      {
        throw new BadRequestException(result.error)
      }

      context.res.cookie("accessToken",result.accessToken,
      {maxAge: Number(process.env.ACCESS_TOKEN_EXPIRE),secure:true, sameSite:"lax"});

      context.res.cookie("refreshToken",result.refreshToken,
      {maxAge: Number(process.env.REFRESH_TOKEN_EXPIRE), secure:true, sameSite:"lax"});

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

  @Mutation((returns) => SignOutResponse,{name:'signOut'})
  async signOut(
    @Context() context: GraphQLExecutionContext & {req:Request, res:Response},)
  {
    try
    {

      context.res.cookie("accessToken",
      {maxAge: 0,httpOnly:true, secure:true, sameSite:"lax"});

      context.res.cookie("refreshToken",
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
