import { ArgsType, Field } from '@nestjs/graphql';

import { PaginationArgs } from '../../share/args/pagination.args';

@ArgsType()
export class FindManyLexicCategoriesByCreatorIdArgs extends PaginationArgs {
  @Field({ nullable: false })
  creatorId?: string;
}


