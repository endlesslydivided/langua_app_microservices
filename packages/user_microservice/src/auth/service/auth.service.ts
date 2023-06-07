import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

import { auth } from '../auth.pb';
import {
  SignInRequestDto,
  SignUpRequestDto,
  ValidateRequestDto,
} from '../dto/auth.dto';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  
  private readonly userRepository: UserRepository;
  @Inject(JwtService)
  private readonly jwtService: JwtService;

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
      user = await this.userRepository.createUserEntity(dto, passwordData);

      await queryRunner.manager.save(user);

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
        token: null,
      };
    }

    const isPasswordValid: boolean = this.jwtService.isPasswordValid(
      dto.password,
      user.credentials.passwordSalt,
      user.credentials.passwordHash,
    );

    if (!isPasswordValid) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['Password is invalid'],
        token: null,
      };
    }

    const token: string = this.jwtService.generateToken(user);

    return { token, status: HttpStatus.OK, error: null };
  }

  public async validate({
    token,
  }: ValidateRequestDto): Promise<auth.ValidateResponse> {
    const decoded: User = await this.jwtService.verify(token) as User;

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

    return { status: HttpStatus.OK, error: null, userId: decoded.id };
  }
}
