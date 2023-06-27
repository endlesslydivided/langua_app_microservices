import { Field, GraphQLTimestamp } from '@nestjs/graphql';

export class Timestamps {
  @Field((type) => GraphQLTimestamp)
  createdAt: string;

  @Field((type) => GraphQLTimestamp)
  updatedAt: string;
}
