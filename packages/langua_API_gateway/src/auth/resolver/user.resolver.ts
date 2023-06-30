import { Args, Query, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { GraphQLString } from 'graphql';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { FindManyUsersArgs } from '../args/user.args';
import { PaginatedUserResponse, User, UserResponse } from '../model/user.model';
import { UserService } from '../service/user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((type) => UserResponse, { name: `findUserById` })
  @UseGuards(AuthGuard)
  async findUserById(@Args('id', { type: () => GraphQLString }) id: string) {
    return this.userService.findUserById({userId:id});
  }

  @Query((type) => PaginatedUserResponse, { name: `findManyUsers` })
  @UseGuards(AuthGuard)
  async findManyUsers(@Args() args: FindManyUsersArgs) {
    const data = {
      pageFilters: {...args},
    };
    return this.userService.findManyUsers(data);
  }

}
