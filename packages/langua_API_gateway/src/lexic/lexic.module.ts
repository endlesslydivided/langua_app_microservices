import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { LEXIC_PACKAGE_NAME, LEXIC_SERVICE_NAME } from '../langua_proto/lexic.pb';
import { WordService } from './service/word.service';
import { WordToVocabularyResolver } from './resolver/word-to-vocabulary.resolver';
import { WordResolver } from './resolver/word.resolver';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { VocabularyResolver } from './resolver/vocabulary.resolver';
import { LexicCategoryResolver } from './resolver/lexic-category.resolver';
import { VocabularyService } from './service/vocabulary.service';
import { LexicCategoryService } from './service/lexic-category.service';


config();

const configService = new ConfigService();

@Module({
    imports: [
        ClientsModule.register([
          {
            name: LEXIC_SERVICE_NAME,
            transport: Transport.GRPC,
            options: {
              url: `0.0.0.0:${configService.get('LEXIC_MICRO_PORT')}`,
              package: LEXIC_PACKAGE_NAME,
              protoPath: join(
                __dirname,
                '..',
                '..',
                '..',
                '..',
                'langua_proto/proto/lexic.proto',
              ),
            },
          },
        ]),
      ],
      providers: [WordService,VocabularyService,LexicCategoryService,WordToVocabularyResolver,WordResolver,VocabularyResolver,LexicCategoryResolver],
})
export class LexicModule {}
