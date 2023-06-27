import { Field, ObjectType } from '@nestjs/graphql';

import { IdentifiedModel } from '../../share/model/identified.model';
import { ResponseModel } from '../../share/model/status.model';

@ObjectType()
export class MaterialToVocabulary extends IdentifiedModel {
  @Field((type) => String, { nullable: false })
  vocabularyId: string;

  @Field((type) => String, { nullable: false })
  materialId: string;

  @Field((type) => Boolean, { nullable: false })
  isFinished: boolean;
}

@ObjectType()
export class ModifyMaterialToVocabularyResponse extends ResponseModel(String) {}

@ObjectType()
export class DeleteMaterialToVocabularyResponse extends ResponseModel(String) {}