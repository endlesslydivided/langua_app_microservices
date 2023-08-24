import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { LexicModule } from './lexic/lexic.module';
import { MaterialModule } from './material/material.module';
import { UserStatsModule } from './user-stats/user-stats.module';
import { RefreshTokenMiddleware } from './auth/middleware/refresh.middleware';
import { Void } from './share/scalar/void.scalar';
import { AccessTokenMiddleware } from './auth/middleware/accessToken.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      cors: {
        credentials: true,
        origin: true
      },
      driver: ApolloDriver,
      context:async ({ req, res }) => {
        return { res };
      },
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
    .apply(RefreshTokenMiddleware,AccessTokenMiddleware)
    .forRoutes('/graphql');

    
  }
}
