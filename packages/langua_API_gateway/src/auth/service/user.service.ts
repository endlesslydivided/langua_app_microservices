import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { auth, AUTH_SERVICE_NAME } from '../../langua_proto/auth.pb';

@Injectable()
export class UserService {
  private userServiceClient: auth.AuthService;

  constructor(@Inject(AUTH_SERVICE_NAME) private  client: ClientGrpc) {
    
  }

  public onModuleInit(): void {
    this.userServiceClient =
      this.client.getService<auth.AuthService>(AUTH_SERVICE_NAME);
  }

  public async findUserById(data: auth.FindUserByIdRequest): Promise<auth.FindUserByIdResponse> {
    return firstValueFrom(this.userServiceClient.findUserById(data));
  }

  public async findManyUsers(data: auth.FindManyUsersRequest): Promise<auth.FindManyUsersResponse> {
    return firstValueFrom(this.userServiceClient.findManyUsers(data));
  }
}
