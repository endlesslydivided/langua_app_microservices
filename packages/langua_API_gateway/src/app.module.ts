import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { LexicModule } from './lexic/lexic.module';
import { MaterialModule } from './material/material.module';
import { UserStatsModule } from './user-stats/user-stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: {
        path: join(process.cwd(), 'src/schema.gql')
      },
      sortSchema: true,
      
    }),
    LexicModule,
    AuthModule,
    MaterialModule,
    UserStatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
