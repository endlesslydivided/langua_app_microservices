import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { auth, AUTH_SERVICE_NAME } from '../auth.pb';
import {
  FindManyUsersRequestDto,
  FindUserByIdRequestDto,
  UpdateUserDto,
} from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller()
export class UserController {


  constructor(private service: UserService){

  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'FindManyUsers')
  private findManyUsers(
    payload: FindManyUsersRequestDto,
  ): Promise<auth.FindManyUsersResponse> {
    return this.service.findMany(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'FindUserById')
  private findUserById(
    payload: FindUserByIdRequestDto,
  ): Promise<auth.FindUserByIdResponse> {
    return this.service.findOneById(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'UpdateUser')
  private updateUser(
    payload: UpdateUserDto,
  ): Promise<auth.UpdateUserResponse> {
    return this.service.updateUser(payload);
  }
}
