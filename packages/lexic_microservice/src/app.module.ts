import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { LexicCategoryModule } from './lexic-category/lexic-category.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { WordModule } from './word/word.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    VocabularyModule,
    WordModule,
    LexicCategoryModule,
    DatabaseModule,
  ],
  controllers: [],
})
export class AppModule {}
