import { Field, GraphQLTimestamp, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Timestamps {
  @Field((type) => GraphQLTimestamp,{nullable:true})
  createdAt: string;

  @Field((type) => GraphQLTimestamp,{nullable:true})
  updatedAt: string;
}
