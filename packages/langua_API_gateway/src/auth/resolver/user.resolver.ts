import { Args, Query, Resolver } from '@nestjs/graphql';

import { BadRequestException, HttpStatus, UseGuards } from '@nestjs/common';
import { GraphQLString } from 'graphql';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { FindManyUsersArgs } from '../args/user.args';
import { PaginatedUser, User } from '../model/user.model';
import { UserService } from '../service/user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((type) => User, { name: `findUserById` })
  @UseGuards(AuthGuard)
  async findUserById(@Args('id', { type: () => GraphQLString }) id: string) {

    const result = await this.userService.findUserById({userId:id});

    if(result.status !== HttpStatus.OK)
    {
      throw new BadRequestException(result.error)
    }

    return result.user;
  }

  @Query((type) => PaginatedUser, { name: `findManyUsers` })
  @UseGuards(AuthGuard)
  async findManyUsers(@Args() args: FindManyUsersArgs) {
    const data = {
      pageFilters: {...args},
    };

    const result = await this.userService.findManyUsers(data);

    if(result.status !== HttpStatus.OK)
    {
      throw new BadRequestException(result.error)
    }

    return result.data;
  }

}
