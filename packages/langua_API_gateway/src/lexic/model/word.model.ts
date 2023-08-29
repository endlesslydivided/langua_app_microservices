import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { IdentifiedModel } from 'src/share/model/identified.model';

import { PaginatedModel } from '../../share/model/paginated.model';
import { LexicCategory } from './lexic-category.model';
import { WordToVocabulary } from './word-to-vocabulary.model';

@ObjectType()
export class Word extends IdentifiedModel {
  @Field((type) => GraphQLString, { nullable: true })
  word: string;

  @Field((type) => GraphQLString, { nullable: true })
  transcription: string;

  @Field((type) => GraphQLString, { nullable: true })
  translation: string;

  @Field((type) => GraphQLString, { nullable: true })
  language: string;

  @Field((type) => GraphQLString, { nullable: true })
  nativeWordLanguage: string;

  @Field((type) => [WordToVocabulary],{ nullable: true })
  wordToVocabulary?: WordToVocabulary[];

  @Field((type) => [LexicCategory],{ nullable: true })
  lexicCategories: LexicCategory[];
}

@ObjectType()
export class PaginatedWord extends PaginatedModel<Word>(Word) {}


