import { Module } from '@nestjs/common';
import { VocabularyStatsService } from './service/vocabulary-stats.service';
import { VocabularyStatsController } from './controller/vocabulary-stats.controller';
import { VocabularyStatsRepository } from './repository/vocabulary-stats.repository';
import {
  VocabularyStats,
  VocabularyStatsSchema,
} from './schema/vocabulary-stats.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VocabularyStats.name, schema: VocabularyStatsSchema },
    ]),
  ],
  providers: [VocabularyStatsService, VocabularyStatsRepository],
  controllers: [VocabularyStatsController],
})
export class UserStatsModule {}
