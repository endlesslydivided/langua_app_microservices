import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

import { IdentifiedModel } from '../../share/model/identified.model';
import { PaginatedModel } from '../../share/model/paginated.model';

@ObjectType()
export class VocabularyStats extends IdentifiedModel {

  @Field((type) => GraphQLString, { nullable: true })
  userId: string;

  @Field((type) => Int, { nullable: true })
  startedMaterialsCount: number;

  @Field((type) => Int, { nullable: true })
  learnedMaterialsCount: number;

  @Field((type) => Int, { nullable: true })
  startedWordsCount: number;

  @Field((type) => Int, { nullable: true })
  learnedWordsCount: number;
}

@ObjectType()
export class OverallVocabularyStats extends IdentifiedModel {

  @Field((type) => GraphQLString, { nullable: false })
  userId: string;

  @Field((type) => Int, { nullable: true })
  totalStartedMaterials: number;

  @Field((type) => Int, { nullable: true })
  totalLearnedMaterials: number;

  @Field((type) => Int, { nullable: true })
  totalStartedWords: number;

  @Field((type) => Int, { nullable: true })
  totalLearnedWords: number;
}

@ObjectType()
export class PaginatedVocabularyStats extends PaginatedModel<VocabularyStats>(VocabularyStats) {}


