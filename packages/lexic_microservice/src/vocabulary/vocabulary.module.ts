import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VocabularyController } from './controller/vocabulary.controller';
import { VocabularyRepository } from './repository/vocabulary.repository';
import { Vocabulary, VocabularySchema } from './schema/vocabulary.schema';
import { VocabularyService } from './service/vocabulary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vocabulary.name, schema: VocabularySchema },
    ]),
  ],
  providers: [VocabularyRepository, VocabularyService],
  controllers: [VocabularyController],
})
export class VocabularyModule {}
