import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import { join } from 'path';
import { LEXIC_PACKAGE_NAME, LEXIC_SERVICE_NAME } from '../langua_proto/lexic.pb';
import { MATERIAL_SERVICE_NAME, MATERIAL_PACKAGE_NAME } from 'src/langua_proto/material.pb';
import { WordToVocabularyResolver } from 'src/lexic/resolver/word-to-vocabulary.resolver';
import { WordResolver } from 'src/lexic/resolver/word.resolver';
import { MaterialService } from './service/material.service';
import { MaterialResolver } from './resolver/material.resolver';
import { MaterialToVocabularyResolver } from './resolver/material-to-vocabulary.resolver';



config();

const configService = new ConfigService();

@Module({
    imports: [
        ClientsModule.register([
          {
            name: MATERIAL_SERVICE_NAME,
            transport: Transport.GRPC,
            options: {
              url: `${configService.get('MATERIAL_MICRO_HOST') || '0.0.0.0'}:${configService.get('MATERIAL_MICRO_PORT') || '50053'}`,
              package: MATERIAL_PACKAGE_NAME,
              protoPath: join(
                __dirname,
                '..',
                '..',
                '..',
                '..',
                'langua_proto/proto/material.proto',
              ),
            },
          },
        ]),
      ],
      providers: [MaterialService,MaterialResolver,MaterialToVocabularyResolver],
})
export class MaterialModule {}
