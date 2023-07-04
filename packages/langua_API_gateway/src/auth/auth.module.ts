import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from '../langua_proto/auth.pb';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';
import { AuthResolver } from './resolver/auth.resolver';
import { UserResolver } from './resolver/user.resolver';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: `0.0.0.0:${process.env.AUTH_MICRO_PORT}`,
          package: AUTH_PACKAGE_NAME,
          protoPath: join(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            'langua_proto/proto/auth.proto',
          ),
        },
      },
    ]),
  ],
  providers: [AuthService,UserService,AuthResolver,UserResolver],
  exports: [AuthService],
})
export class AuthModule {}
