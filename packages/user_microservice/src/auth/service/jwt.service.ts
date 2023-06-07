import { Injectable } from '@nestjs/common';
import { JwtService as Jwt } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class JwtService {
  private readonly userRepository: UserRepository;

  private readonly jwt: Jwt;

  constructor(jwt: Jwt) {
    this.jwt = jwt;
  }

  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  public async validateUser(decoded: { id: string }): Promise<User> {
    return this.userRepository.findOneById(decoded.id);
  }

  public generateToken(user: User): string {
    return this.jwt.sign({ id: user.id, email: user.contacts.email });
  }

  public isPasswordValid(
    password: string,
    salt: string,
    userPassword: string,
  ): boolean {
    const saltedPassword = bcrypt.hashSync(password, salt);
    return bcrypt.compareSync(saltedPassword, userPassword);
  }

  public encodePassword(password: string): { salt: string; password: string } {
    const salt: string = bcrypt.genSaltSync(10);

    return { salt, password: bcrypt.hashSync(password, salt) };
  }

  public async verify(token: string): Promise<unknown> {
    try {
      return this.jwt.verify(token);
    } catch (err) {}
  }
}
