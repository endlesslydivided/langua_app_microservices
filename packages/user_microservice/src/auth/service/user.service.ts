import { HttpStatus, Injectable } from '@nestjs/common';

import { auth } from '../auth.pb';
import {
  FindManyUsersRequestDto,
  FindUserByIdRequestDto,
} from '../dto/user.dto';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  private readonly userRepository: UserRepository;

  public async findOneById(
    dto: FindUserByIdRequestDto,
  ): Promise<auth.FindUserByIdResponse> {
    const user = await this.userRepository.findOneById(dto.userId);
    return {
      status: HttpStatus.OK,
      error: null,
      user: { ...user, birthday: user.birthday.toISOString() },
    };
  }

  public async findMany(
    dto: FindManyUsersRequestDto,
  ): Promise<auth.FindManyUsersResponse> {
    const users = await this.userRepository.findManyAndCount(dto.pageFilters);
    return {
      status: HttpStatus.OK,
      error: null,
      data: {
        rows: users[0].map((u: User) => ({
          ...u,
          birthday: u.birthday.toISOString(),
        })),
        count: users[1],
      },
    };
  }
}
