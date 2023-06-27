import { Field, InputType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

@InputType()
export class CreateVocabularyInput {
  @Field((type) => GraphQLString, { nullable: false })
  userId: string;

  @Field((type) => GraphQLString, { nullable: false })
  language: string;

  @Field((type) => GraphQLString, { nullable: false })
  vocabularyNativeLanguage: string;
  
}
