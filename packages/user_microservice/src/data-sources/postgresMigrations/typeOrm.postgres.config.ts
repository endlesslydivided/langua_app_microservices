import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import { User } from '../../auth/entity/user.entity';
import { UserCredentials } from '../../auth/entity/userContacts.entity';
import { UserContacts } from '../../auth/entity/userCredentials.entity';
import { PostgresMigrations1686044428288 } from './1686044428288-postgresMigrations';
import { PostgresMigrations1686049870201 } from './1686049870201-postgresMigrations';

config();

const configService = new ConfigService();

export const typeOrmPostgresConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [User, UserContacts, UserCredentials],
  migrations: [
    PostgresMigrations1686044428288,
    PostgresMigrations1686049870201,
  ],
};

export default new DataSource(typeOrmPostgresConfig as DataSourceOptions);
