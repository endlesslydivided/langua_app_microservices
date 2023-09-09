import { ArgsType, Field } from '@nestjs/graphql';

import { PaginationArgs } from '../../share/args/pagination.args';

@ArgsType()
export class FindManyMaterialsByVocabularyIdArgs extends PaginationArgs {
  @Field({ nullable: false })
  vocabularyId?: string;
}

@ArgsType()
export class FindManyMaterialsByCreatorIdArgs extends PaginationArgs {
  @Field({ nullable: false })
  creatorId?: string;
}
