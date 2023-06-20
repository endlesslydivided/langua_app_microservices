import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

@Module({
  imports: [
    MongooseModule.forRoot(
      `${configService.get('MONGO_CONNECTION_STRING')}${configService.get(
        'MONGO_DB_NAME',
      )}`,
      {
        dbName: configService.get('MONGO_DB_NAME'),
      },
    ),
  ],
})
export class DatabaseModule {}
