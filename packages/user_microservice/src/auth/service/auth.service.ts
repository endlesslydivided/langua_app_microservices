import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectDataSource } from '@nestjs/typeorm';
import { DataSource, QueryRunner } from 'typeorm';

import { auth } from '../auth.pb';
import {
  RefreshRequestDto,
  SignInRequestDto,
  SignUpRequestDto,
  ValidateRequestDto,
} from '../dto/auth.dto';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @InjectDataSource()
  private readonly dataSource: DataSource;

  public async signUp(dto: SignUpRequestDto): Promise<auth.SignUpResponse> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let user: User = await this.userRepository.findOneByEmail(dto.email);

      if (user) {
        return { status: HttpStatus.CONFLICT, error: ['Email already exists'] };
      }

      const passwordData = await this.jwtService.encodePassword(dto.password);

      const userContacts = await this.userRepository.createUserContactsEntity(
        dto,
      );
      await queryRunner.manager.save(userContacts);

      const userCredentials =
        await this.userRepository.createUserCredentialsEntity(
          dto,
          passwordData,
        );
      await queryRunner.manager.save(userCredentials);

      user = await this.userRepository.createUserEntity(
        dto,
        userContacts,
        userCredentials,
      );

      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();

      return { status: HttpStatus.CREATED, error: null };
    } catch (e: unknown) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  public async signIn(dto: SignInRequestDto): Promise<auth.SignInResponse> {
    const user: User = await this.userRepository.findOneByEmail(dto.email);

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['User is not found'],
        accessToken: null,
      };
    }

    const isPasswordValid: boolean = this.jwtService.isPasswordValid(
      dto.password,
      user.userCredentials.passwordSalt,
      user.userCredentials.passwordHash,
    );

    if (!isPasswordValid) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: ['Password is invalid'],
        accessToken: null,
      };
    }

    const {accessToken,refreshToken} = await this.jwtService.generateToken(user);

    return { accessToken,refreshToken, status: HttpStatus.OK, error: null };
  }

  public async validate({
    accessToken,
  }: ValidateRequestDto): Promise<auth.ValidateResponse> {
    const decoded: User = (await this.jwtService.verify(accessToken)) as User;

    if (!decoded) {
      return {
        status: HttpStatus.FORBIDDEN,
        error: ['Token is invalid'],
        userId: null,
      };
    }

    const user: User = await this.jwtService.validateUser(decoded);

    if (!user) {
      return {
        status: HttpStatus.CONFLICT,
        error: ['User is not found'],
        userId: null,
      };
    }

    return {
      status: HttpStatus.OK,
      userId: user.id,
      error: null,
    };
  }
  
  public async refresh({
    refreshToken,
  }: RefreshRequestDto): Promise<auth.RefreshResponse> {
    const decoded:User = await this.jwtService.verify(refreshToken) as User;


    if (!decoded) {
      return {
        status: HttpStatus.FORBIDDEN,
        error: ['Token is invalid'],
        accessToken: null,
        refreshToken: null
      };
    }

    const user: User = await this.jwtService.validateUser(decoded);

    if (!user) {
      return {
        status: HttpStatus.CONFLICT,
        error: ['User is not found'],
        accessToken: null,
        refreshToken: null
      };
    }

    const {accessToken: newAccessToken,refreshToken: newRefreshToken} = await this.jwtService.generateToken(user);

    return {
      status: HttpStatus.OK,
      accessToken:newAccessToken,
      refreshToken:newRefreshToken,
      error: null,
    };
  }
}
