import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IdentifiedModel } from '../../share/model/identified.model';

@ObjectType()
export class WordToVocabulary extends IdentifiedModel {

  @Field(type => String,{ nullable: false })
  vocabularyId: string;

  @Field(type => String,{ nullable: false })
  wordId: string;

  @Field(type => Boolean,{ nullable: false })
  isFinished: boolean;

}