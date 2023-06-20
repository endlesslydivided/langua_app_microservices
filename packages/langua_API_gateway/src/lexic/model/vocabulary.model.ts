import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { IdentifiedModel } from '../../share/model/identified.model';

@ObjectType()
export class Word extends IdentifiedModel {

  @Field(type => GraphQLString,{ nullable: false })
  language: string;

  @Field(type => GraphQLString,{ nullable: false })
  vocabularyNativeLanguage: string;
  
}