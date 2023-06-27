import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { LEXIC_PACKAGE_NAME, LEXIC_SERVICE_NAME } from '../langua_proto/lexic.pb';
import { WordService } from './service/word.service';
import { WordToVocabularyResolver } from './resolver/word-to-vocabulary.resolver';
import { WordResolver } from './resolver/word.resolver';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';


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
      providers: [WordService,WordToVocabularyResolver,WordResolver],
})
export class LexicModule {}
