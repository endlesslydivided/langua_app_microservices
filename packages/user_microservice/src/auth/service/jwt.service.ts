import { Inject, Injectable } from '@nestjs/common';
import { JwtService as Jwt } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';


type EncodedJWTData = { id: string; email: string };

@Injectable()
export class JwtService {



  private readonly jwt: Jwt;

  constructor(jwt: Jwt,
    private userRepository: UserRepository) {
    this.jwt = jwt;
  }

  public async decode(token: string): Promise<EncodedJWTData> {
    return this.jwt.decode(token, null) as EncodedJWTData;
  }

  public async validateUser(decoded: EncodedJWTData | User): Promise<User> {
    return this.userRepository.findOneById(decoded.id);
  }

  public async generateToken(user: User):Promise<{accessToken:string, refreshToken:string}> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(
          {
              userId: user.id,
          },
          {
              expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
          },
      ),
      this.jwt.signAsync(
          {
              userId: user.id,
          },
          {
              expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
          },
      ),
      ]);
      return {accessToken,refreshToken};;
  }

  public isPasswordValid(
    password: string,
    salt: string,
    userPassword: string,
  ): boolean {
    const saltedPassword = bcrypt.hashSync(password, salt);
    return saltedPassword === userPassword;
  }

  public encodePassword(password: string): { salt: string; password: string } {

    if(password)
    {
      const salt: string = bcrypt.genSaltSync(10);
      return { salt, password: bcrypt.hashSync(password, salt) };
    }

    return {salt:null, password:null};
  }

  public async verify(token: string): Promise<unknown> {
    try {
      return this.jwt.verify(token);
    } 
    catch (err) {
    }
  }
}
