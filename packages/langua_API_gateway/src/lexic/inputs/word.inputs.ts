import { Field, InputType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

@InputType()
export class CreateWordInput {
  @Field((type) => GraphQLString, { nullable: false })
  word: string;

  @Field((type) => GraphQLString, { nullable: false })
  transcription: string;

  @Field((type) => GraphQLString, { nullable: false })
  language: string;

  @Field((type) => GraphQLString, { nullable: false })
  lexicCategoryId: string;
}
