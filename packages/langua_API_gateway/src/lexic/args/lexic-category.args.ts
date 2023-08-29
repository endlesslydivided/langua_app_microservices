import { ArgsType, Field } from '@nestjs/graphql';

import { PaginationArgs } from '../../share/args/pagination.args';

@ArgsType()
export class FindManyLexicCategoriesByCreatorIdArgs extends PaginationArgs {
  @Field({ nullable: false })
  creatorId?: string;

  @Field({ nullable: false })
  language?: string;

  @Field({ nullable: false })
  nativeCategoryLanguage?: string;
  
}

@ArgsType()
export class FindManyLexicCategories extends PaginationArgs {
  @Field({ nullable: false })
  language?: string;

  @Field({ nullable: false })
  nativeCategoryLanguage?: string;
}


