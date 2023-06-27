import { ArgsType, Field } from '@nestjs/graphql';

import { PaginationArgs } from '../../share/args/pagination.args';

@ArgsType()
export class FindManyVocabulariesByUserIdArgs extends PaginationArgs {
  @Field({ nullable: false })
  userId?: string;
}


