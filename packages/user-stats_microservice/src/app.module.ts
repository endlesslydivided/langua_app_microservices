import { Module } from '@nestjs/common';
import { UserStatsModule } from './vocabulary-stats/vocabulary-stats.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [DatabaseModule,UserStatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
