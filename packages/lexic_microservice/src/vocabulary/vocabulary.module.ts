import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Vocabulary, VocabularySchema } from './schema/vocabulary.schema';
import { VocabularyService } from './service/vocabulary.service';
import { VocabularyController } from './controller/vocabulary.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Vocabulary.name, schema: VocabularySchema }])],
  providers: [VocabularyService],
  controllers: [VocabularyController]
})
export class VocabularyModule {}
