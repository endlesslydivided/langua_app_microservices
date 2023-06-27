import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { FindManyLexicCategoriesByCreatorIdArgs } from '../args/lexic-category.args';
import { CreateLexicCategoryInput } from '../inputs/lexic-category.inputs';
import { PaginatedLexicCategoryResponse } from '../model/lexic-category.model';
import {
    ModifyWordToVocabularyResponse
} from '../model/word-to-vocabulary.model';
import { LexicCategoryService } from '../service/lexic-category.service';

@Resolver((of) => LexicCategoryResolver)
export class LexicCategoryResolver {
  constructor(private lexicCategoryService: LexicCategoryService) {}

  @Mutation((returns) => ModifyWordToVocabularyResponse)
  async createLexicCategory(@Args('createLexicCategory') input: CreateLexicCategoryInput) {
    const result = await this.lexicCategoryService.createLexicCategory(input);
    return {
      status: result.status,
      error: result.error,
      data: result.id,
    };
  }

  @Query((type) => PaginatedLexicCategoryResponse, { name: `findManyLexicCategoriesByCreatorId` })
  async findManyLexicCategoriesByCreatorId(@Args() args: FindManyLexicCategoriesByCreatorIdArgs) {
    const { creatorId, page, limit } = args;
    const data = {
      creatorId,
      pageFilters: {
        page,
        limit,
      },
    };
    return this.lexicCategoryService.findManyLexicCategoriesByCreatorId(data);
  }

}
