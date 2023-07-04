import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { LexicModule } from './lexic/lexic.module';
import { MaterialModule } from './material/material.module';
import { UserStatsModule } from './user-stats/user-stats.module';
import { RefreshMiddleware } from './auth/middleware/refresh.middleware';
import { Void } from './share/scalar/void.scalar';

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
      resolvers: {
        Void: Void,
    },
    }),
    LexicModule,
    AuthModule,
    MaterialModule,
    UserStatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(RefreshMiddleware)
    .forRoutes('/graphql');
  }
}
