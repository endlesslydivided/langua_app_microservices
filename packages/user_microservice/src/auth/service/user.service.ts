import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { auth } from '../auth.pb';
import {
  FindManyUsersRequestDto,
  FindUserByIdRequestDto,
  UpdateUserDto,
} from '../dto/user.dto';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { DataSource, QueryRunner } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { JwtService } from './jwt.service';
import { UserCredentials } from '../entity/userContacts.entity';
import { UserContacts } from '../entity/userCredentials.entity';

@Injectable()
export class UserService {

  constructor(private  userRepository: UserRepository,
    private jwtService: JwtService,
    @InjectDataSource() private  dataSource: DataSource){}

  public async findOneById(
    dto: FindUserByIdRequestDto,
  ): Promise<auth.FindUserByIdResponse> {
    const user = await this.userRepository.findOneById(dto.userId);
    return {
      status: HttpStatus.OK,
      error: null,
      user: { ...user, birthday: user.birthday?.toISOString() },
    };
  }

  public async findMany(
    dto: FindManyUsersRequestDto,
  ): Promise<auth.FindManyUsersResponse> {
    const data = await this.userRepository.findManyAndCount(dto.pageFilters);
    return {
      status: HttpStatus.OK,
      error: null,
      data: {
        rows: data[0].map((u: User) => ({
          ...u,
          birthday: u.birthday.toISOString(),
        })),
        count: data[1],
      },
    };
  }

  public async updateUser(dto: UpdateUserDto): Promise<auth.UpdateUserResponse> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let user: User = await this.userRepository.findOneById(dto.id);
      let userCredentials: UserCredentials = await this.userRepository.findOneUserCredentialsById(user.userCredentials.id);
      let userContacts: UserContacts = await this.userRepository.findOneUserContactsById(user.userContacts.id);


      user.birthday = dto.birthday ? new Date(dto.birthday) : user.birthday;
      user.city = dto.city ?? user.city;
      user.country = dto.country ?? user.country;
      user.firstname = dto.firstname ?? user.firstname;
      user.nativeLanguage = dto.nativeLanguage ?? user.nativeLanguage;
      user.surname = dto.surname ?? user.surname;

      userContacts.phoneNumber = dto.phoneNumber ?? user.userContacts.phoneNumber;

      if(dto.password)
      {
        const passwordData = await this.jwtService.encodePassword(dto.password);

        userCredentials.passwordHash =  passwordData.password;
        userCredentials.passwordSalt =  passwordData.salt;
      }

      userCredentials.nickname =  dto.nickname ?? user.userCredentials.nickname;

      await queryRunner.manager.save(user);
      await queryRunner.manager.save(userContacts);
      await queryRunner.manager.save(userCredentials);

      await queryRunner.commitTransaction();

      return { status: HttpStatus.CREATED, error: null };
    } catch (e: unknown) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}
