import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MaterialController } from './controller/material.controller';
import { MaterialRepository } from './repository/material.repository';
import { MaterialToVocabularyRepository } from './repository/material-to-vocabulary.repository';
import { Material, MaterialSchema } from './schema/material.schema';
import {
  MaterialToVocabulary,
  MaterialToVocabularySchema,
} from './schema/material-to-vocabulary.schema';
import { MaterialService } from './service/material.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

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
      { name: Material.name, schema: MaterialSchema },
      { name: MaterialToVocabulary.name, schema: MaterialToVocabularySchema },
    ]),
  ],
  controllers: [MaterialController],
  providers: [
    MaterialRepository,
    MaterialToVocabularyRepository,
    MaterialService,
  ],
})
export class MaterialModule {}
