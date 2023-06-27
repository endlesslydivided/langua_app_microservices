import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from '../langua_proto/auth.pb';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

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
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
