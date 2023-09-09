import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AppModule } from './app.module';
import { MATERIAL_PACKAGE_NAME } from './material.pb';
import { AllExceptionsFilter } from './share/filter/all-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:${process.env.PORT}`,
        package: MATERIAL_PACKAGE_NAME,
        protoPath: join(
          __dirname,
          '..',
          '..',
          'langua_proto/proto/material.proto',
        ),
      },
    },
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen();
}
bootstrap();
