import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { SignUpRequestDto } from '../dto/auth.dto';
import { PageFilters } from '../dto/user.dto';
import { User } from '../entity/user.entity';
import { UserCredentials } from '../entity/userContacts.entity';
import { UserContacts } from '../entity/userCredentials.entity';

@Injectable()
export class UserRepository {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @InjectRepository(UserContacts)
  private readonly userContactsRepository: Repository<UserContacts>;

  @InjectRepository(UserCredentials)
  private readonly userCredentialsRepository: Repository<UserCredentials>;

  createUserEntity(
    dto: SignUpRequestDto,
    userContacts: UserContacts,
    userCredentials: UserCredentials,
  ): User {
    const user = {
      birthday: new Date(dto.birthday),
      city: dto.city,
      country: dto.country,
      firstname: dto.firstname,
      surname: dto.surname,
      sex: dto.sex,
      nativeLanguage: dto.nativeLanguage,
    };

    return this.userRepository.create({
      ...user,
      userContacts,
      userCredentials,
    });
  }

  createUserContactsEntity(dto: SignUpRequestDto): UserContacts {
    const contacts = {
      email: dto.email,
      phoneNumber: dto.phoneNumber,
    };

    return this.userContactsRepository.create({ ...contacts });
  }

  createUserCredentialsEntity(
    dto: SignUpRequestDto,
    passwordData: { salt: string; password: string },
  ): UserCredentials {
    const credentials = {
      nickname: dto.nickname  ?? null,
      passwordHash: passwordData.password,
      passwordSalt: passwordData.salt,
    };

    return this.userCredentialsRepository.create({ ...credentials });
  }

  async findOneById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: { userContacts: true, userCredentials: true },
      select: {
        id: true,
        firstname: true,
        nativeLanguage:true,
        surname: true,
        city: true,
        birthday: true,
        country: true,
        createdAt: true,
        updatedAt: true,
        userContacts: {
          phoneNumber: true,
          email: true,
        },
        userCredentials: {
          nickname: true,
        },
      },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { userContacts: { email } },
      relations: { userContacts: true, userCredentials: true },
      select: {
        id: true,
        firstname: true,
        surname: true,
        city: true,
        birthday: true,
        country: true,
        createdAt: true,
        updatedAt:true,
        userContacts: {
          phoneNumber: true,
          email: true,
        },
        userCredentials: {
          nickname: true,
          passwordHash: true,
          passwordSalt: true,
        },
      },
    });
  }

  async softDeleteUser(id: string): Promise<UpdateResult> {
    return await this.userRepository.softDelete(id);
  }

  async findManyAndCount(filters: PageFilters): Promise<[User[], number]> {
    return await this.userRepository.findAndCount({
      take: filters.limit,
      skip: filters.limit * filters.page,
      relations: { userContacts: true, userCredentials: true },
      select: {
        id: true,
        firstname: true,
        surname: true,
        city: true,
        country: true,
        birthday: true,
        createdAt: true,
        userContacts: {
          phoneNumber: true,
          email: true,
        },
        userCredentials: {
          nickname: true,
        },
      },
    });
  }
}
