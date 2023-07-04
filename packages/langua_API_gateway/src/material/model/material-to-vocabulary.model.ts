import { Field, ObjectType } from '@nestjs/graphql';

import { IdentifiedModel } from '../../share/model/identified.model';

@ObjectType()
export class MaterialToVocabulary extends IdentifiedModel {
  @Field((type) => String, { nullable: false })
  vocabularyId: string;

  @Field((type) => String, { nullable: false })
  materialId: string;

  @Field((type) => Boolean, { nullable: false })
  isFinished: boolean;
}
