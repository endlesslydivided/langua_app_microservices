import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WordController } from './controller/word.controller';
import { WordRepository } from './repository/word.repository';
import { WordToVocabularyRepository } from './repository/word-to-vocabulary.repository';
import { Word, WordSchema } from './schema/word.schema';
import {
  WordToVocabulary,
  WordToVocabularySchema,
} from './schema/word-to-vocabulary.schema';
import { WordService } from './service/word.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Word.name, schema: WordSchema },
      { name: WordToVocabulary.name, schema: WordToVocabularySchema },
    ]),
  ],
  providers: [WordService, WordRepository, WordToVocabularyRepository],
  controllers: [WordController],
})
export class WordModule {}
