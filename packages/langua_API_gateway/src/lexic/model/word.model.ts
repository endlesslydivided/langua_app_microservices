import { Field, ObjectType } from '@nestjs/graphql';
import { IdentifiedModel } from '../../share/model/identified.model';
import { WordToVocabulary } from './word-to-vocabulary.model';
import { LexicCategory } from './lexic-category.model';
import { GraphQLString } from 'graphql';

@ObjectType()
export class Word extends IdentifiedModel {
    
  @Field(type => GraphQLString,{ nullable: false })
  word: string;

  @Field(type => GraphQLString,{ nullable: false })
  transcription: string;

  @Field(type => GraphQLString,{ nullable: false })
  language: string;

  @Field(type => WordToVocabulary)
  wordToVocabulary?: WordToVocabulary;

  @Field(type => [LexicCategory])
  categories: LexicCategory[];

}