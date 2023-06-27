import { Field, ID, ObjectType } from '@nestjs/graphql';

import { IdentifiedModel } from '../../share/model/identified.model';
import { ResponseModel } from '../../share/model/status.model';

@ObjectType()
export class WordToVocabulary extends IdentifiedModel {
  @Field((type) => String, { nullable: false })
  vocabularyId: string;

  @Field((type) => String, { nullable: false })
  wordId: string;

  @Field((type) => Boolean, { nullable: false })
  isFinished: boolean;
}

@ObjectType()
export class ModifyWordToVocabularyResponse extends ResponseModel(String) {}
