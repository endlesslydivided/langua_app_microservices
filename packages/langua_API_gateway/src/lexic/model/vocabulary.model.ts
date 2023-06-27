import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

import { IdentifiedModel } from '../../share/model/identified.model';
import { PaginatedModel } from '../../share/model/paginated.model';
import { ResponseModel } from '../../share/model/status.model';

@ObjectType()
export class Vocabulary extends IdentifiedModel {
  @Field((type) => GraphQLString, { nullable: false })
  userId: string;

  @Field((type) => GraphQLString, { nullable: false })
  language: string;

  @Field((type) => GraphQLString, { nullable: false })
  vocabularyNativeLanguage: string;
}

@ObjectType()
export class PaginatedVocabulary extends PaginatedModel(Vocabulary) {}

@ObjectType()
export class PaginatedVocabularyResponse extends ResponseModel(PaginatedVocabulary) {}

@ObjectType()
export class VocabularyResponse extends ResponseModel(Vocabulary) {}

@ObjectType()
export class ModifyVocabularyResponse extends ResponseModel(String) {}