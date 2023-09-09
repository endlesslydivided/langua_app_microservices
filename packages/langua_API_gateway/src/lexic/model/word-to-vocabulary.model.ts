import { Field, ObjectType } from '@nestjs/graphql';

import { IdentifiedModel } from '../../share/model/identified.model';

@ObjectType()
export class WordToVocabulary extends IdentifiedModel {

  @Field((type) => String, { nullable: true })
  id: string;

  @Field((type) => String, { nullable: true })
  vocabularyId: string;

  @Field((type) => String, { nullable: true })
  wordId: string;

  @Field((type) => Boolean, { nullable: true })
  isFinished: boolean;
}

