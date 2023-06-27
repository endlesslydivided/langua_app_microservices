import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { IdentifiedModel } from 'src/share/model/identified.model';

import { LexicCategory } from './lexic-category.model';
import { PaginatedModel } from '../../share/model/paginated.model';
import { ResponseModel } from '../../share/model/status.model';
import { WordToVocabulary } from './word-to-vocabulary.model';

@ObjectType()
export class Word extends IdentifiedModel {
  @Field((type) => GraphQLString, { nullable: false })
  word: string;

  @Field((type) => GraphQLString, { nullable: false })
  transcription: string;

  @Field((type) => GraphQLString, { nullable: false })
  language: string;

  @Field((type) => WordToVocabulary)
  wordToVocabulary?: WordToVocabulary;

  @Field((type) => [LexicCategory])
  lexicCategories: LexicCategory[];
}

@ObjectType()
export class PaginatedWord extends PaginatedModel(Word) {}

@ObjectType()
export class PaginatedWordResponse extends ResponseModel(PaginatedWord) {}

@ObjectType()
export class WordResponse extends ResponseModel(Word) {}

@ObjectType()
export class ModifyWordResponse extends ResponseModel(String) {}
