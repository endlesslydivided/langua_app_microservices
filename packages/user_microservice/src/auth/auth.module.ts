import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './controller/auth.controller';
import { UserController } from './controller/user.controller';
import { User } from './entity/user.entity';
import { UserCredentials } from './entity/userContacts.entity';
import { UserContacts } from './entity/userCredentials.entity';
import { UserRepository } from './repository/user.repository';
import { AuthService } from './service/auth.service';
import { JwtService } from './service/jwt.service';
import { UserService } from './service/user.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'dev',
      signOptions: { expiresIn: '365d' },
    }),
    TypeOrmModule.forFeature([User, UserContacts, UserCredentials]),
  ],
  controllers: [AuthController, UserController],
  providers: [
    AuthService,
    JwtService,
    JwtStrategy,
    UserRepository,
    UserService,
  ],
})
export class AuthModule {}
