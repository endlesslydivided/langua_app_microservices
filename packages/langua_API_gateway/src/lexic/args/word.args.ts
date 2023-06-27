import { ArgsType, Field } from '@nestjs/graphql';

import { PaginationArgs } from '../../share/args/pagination.args';

@ArgsType()
export class FindManyWordsByVocabularyIdArgs extends PaginationArgs {
  @Field({ nullable: false })
  vocabularyId?: string;
}

@ArgsType()
export class FindManyWordsByLexicCategoryIdArgs extends PaginationArgs {
  @Field({ nullable: false })
  lexicCategoryId?: string;
}
