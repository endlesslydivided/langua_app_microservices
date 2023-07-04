import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { MaterialModule } from './material/material.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MaterialModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
