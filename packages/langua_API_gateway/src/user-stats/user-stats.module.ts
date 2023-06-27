import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import { join } from 'path';
import { USER_STATS_SERVICE_NAME, USER_STATS_PACKAGE_NAME} from '../langua_proto/user-stats.pb';
import { VocabularyStatsService } from './service/vocabulary-stats.service';



config();

const configService = new ConfigService();

@Module({
    imports: [
        ClientsModule.register([
          {
            name: USER_STATS_SERVICE_NAME,
            transport: Transport.GRPC,
            options: {
              url: `0.0.0.0:${configService.get('_MICRO_PORT')}`,
              package:  USER_STATS_PACKAGE_NAME,
              protoPath: join(
                __dirname,
                '..',
                '..',
                '..',
                '..',
                'langua_proto/proto/user-stats.proto',
              ),
            },
          },
        ]),
      ],
      providers: [VocabularyStatsService],
})
export class UserStatsModule {}
