import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './share/filter/http-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:${process.env.PORT}`,
        package: 'auth',
        protoPath: join(__dirname, '..', '..', 'langua_proto/proto/auth.proto'),
      },
    },
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen();
}
bootstrap();
