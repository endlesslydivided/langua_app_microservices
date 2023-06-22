import { Module } from '@nestjs/common';
import { UserStatsModule } from './vocabulary-stats/vocabulary-stats.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    UserStatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
