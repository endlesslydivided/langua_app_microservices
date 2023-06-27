import { Field, InputType } from '@nestjs/graphql';
import { GraphQLBoolean, GraphQLString } from 'graphql';

@InputType()
export class CreateWordToVocabularyInput {
  @Field((type) => GraphQLString, { nullable: false })
  vocabularyId: string;

  @Field((type) => GraphQLString, { nullable: false })
  wordId: string;
}

@InputType()
export class UpdateWordToVocabularyInput {
  @Field((type) => GraphQLString, { nullable: false })
  id: string;

  @Field((type) => GraphQLString, { nullable: false })
  userId: string;

  @Field((type) => GraphQLBoolean, { nullable: false })
  isFinished: boolean;
}
