import { Field, GraphQLTimestamp, ID, InterfaceType } from '@nestjs/graphql';

export class Timestamps {
  @Field(type => GraphQLTimestamp)
  createdAt: string;

  @Field(type => GraphQLTimestamp)
  updatedAt: string;
}