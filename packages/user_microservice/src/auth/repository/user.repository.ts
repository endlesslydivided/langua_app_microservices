import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { SignUpRequestDto } from '../dto/auth.dto';
import { PageFilters } from '../dto/user.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository {

  @InjectRepository(User)
  private readonly userRepository: Repository<User>


  createUserEntity(
    dto: SignUpRequestDto,
    passwordData: { salt: string; password: string },
  ): User {
    const contacts = {
      email: dto.email,
      phoneNumber: dto.phoneNumber,
    };
    const user = {
      birthday: new Date(dto.birthday),
      city: dto.city,
      country: dto.country,
      firstname: dto.firstname,
      surname: dto.surname,
      sex: dto.sex,
      nativeLanguage: dto.nativeLanguage,
    };

    const credentials = {
      nickname: dto.nickname,
      passwordHash: passwordData.password,
      passwordSalt: passwordData.salt,
    };
    return this.userRepository.create({ ...user, credentials, contacts });
  }

  async findOneById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: { contacts: true, credentials: true },
      select: {
        id: true,
        firstname: true,
        surname: true,
        city: true,
        country: true,
        sex: true,
        createdAt: true,
        contacts: {
          phoneNumber: true,
          email: true,
        },
        credentials: {
          nickname: true,
        },
      },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { contacts: { email } },
      relations: { contacts: true, credentials: true },
      select: {
        id: true,
        firstname: true,
        surname: true,
        city: true,
        country: true,
        sex: true,
        createdAt: true,
        contacts: {
          phoneNumber: true,
          email: true,
        },
        credentials: {
          nickname: true,
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
      relations: { contacts: true, credentials: true },
      select: {
        id: true,
        firstname: true,
        surname: true,
        city: true,
        country: true,
        sex: true,
        createdAt: true,
        contacts: {
          phoneNumber: true,
          email: true,
        },
        credentials: {
          nickname: true,
        },
      },
    });
  }
}
