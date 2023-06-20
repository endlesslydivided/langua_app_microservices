import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './share/filter/http-exception.filter';
import { USER_STATS_PACKAGE_NAME } from './user-stats.pb';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:${process.env.PORT}`,
        package: USER_STATS_PACKAGE_NAME,
        protoPath: join(
          __dirname,
          '..',
          '..',
          'langua_proto/proto/user-stats.proto',
        ),
      },
    },
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen();
}
bootstrap();
