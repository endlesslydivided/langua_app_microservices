import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WordController } from './controller/word.controller';
import { WordToVocabularyRepository } from './repository/word-to-vocabulary.repository';
import { WordRepository } from './repository/word.repository';
import {
  WordToVocabulary,
  WordToVocabularySchema,
} from './schema/word-to-vocabulary.schema';
import { Word, WordSchema } from './schema/word.schema';
import { WordService } from './service/word.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

export const USER_STATS_PACKAGE = 'USER_STATS_PACKAGE';

config();

const configService = new ConfigService();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_STATS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: `${configService.get('USER_STATS_MICRO_HOST') || '0.0.0.0'}:${configService.get('USER_STATS_MICRO_PORT') || '50054'}`,
          package: 'userStats',
          protoPath: join(
            __dirname,
            '..',
            '..',
            '..',
            'langua_proto/proto/user-stats.proto',
          ),
        },
      },
    ]),
    MongooseModule.forFeature([
      { name: Word.name, schema: WordSchema },
      { name: WordToVocabulary.name, schema: WordToVocabularySchema },
    ]),
  ],
  providers: [WordService, WordRepository, WordToVocabularyRepository],
  controllers: [WordController],
})
export class WordModule {}
