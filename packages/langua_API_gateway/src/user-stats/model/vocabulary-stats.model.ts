import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

import { IdentifiedModel } from '../../share/model/identified.model';
import { PaginatedModel } from '../../share/model/paginated.model';
import { ResponseModel } from '../../share/model/status.model';

@ObjectType()
export class VocabularyStats extends IdentifiedModel {

  @Field((type) => GraphQLString, { nullable: false })
  userId: string;

  @Field((type) => Int, { nullable: false })
  startedMaterialsCount: number;

  @Field((type) => Int, { nullable: false })
  learnedMaterialsCount: number;

  @Field((type) => Int, { nullable: false })
  startedWordsCount: number;

  @Field((type) => Int, { nullable: false })
  learnedWordsCount: number;
}

@ObjectType()
export class OverallVocabularyStats extends IdentifiedModel {

  @Field((type) => GraphQLString, { nullable: false })
  userId: string;

  @Field((type) => Int, { nullable: false })
  totalStartedMaterials: number;

  @Field((type) => Int, { nullable: false })
  totalLearnedMaterials: number;

  @Field((type) => Int, { nullable: false })
  totalStartedWords: number;

  @Field((type) => Int, { nullable: false })
  totalLearnedWords: number;
}


@ObjectType()
export class VocabularyStatsResponse extends ResponseModel(VocabularyStats) {}

@ObjectType()
export class OverallVocabularyStatsResponse extends ResponseModel(OverallVocabularyStats) {}

