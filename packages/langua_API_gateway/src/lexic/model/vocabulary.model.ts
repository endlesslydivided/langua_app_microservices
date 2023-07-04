import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

import { IdentifiedModel } from '../../share/model/identified.model';
import { PaginatedModel } from '../../share/model/paginated.model';

@ObjectType()
export class Vocabulary extends IdentifiedModel {
  @Field((type) => GraphQLString, { nullable: true })
  userId: string;

  @Field((type) => GraphQLString, { nullable: true })
  language: string;

  @Field((type) => GraphQLString, { nullable: true })
  vocabularyNativeLanguage: string;
}

@ObjectType()
export class PaginatedVocabulary extends PaginatedModel<Vocabulary>(Vocabulary) {}
