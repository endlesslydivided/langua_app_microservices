import { ArgsType, Field } from '@nestjs/graphql';

import { PaginationArgs } from '../../share/args/pagination.args';

@ArgsType()
export class FindManyVocabularyStatsByUserIdArgs extends PaginationArgs {
  @Field({ nullable: false })
  userId?: string;
}

