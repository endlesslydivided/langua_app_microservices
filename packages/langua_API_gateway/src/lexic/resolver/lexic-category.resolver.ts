import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { BadRequestException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { FindManyLexicCategories, FindManyLexicCategoriesByCreatorIdArgs } from '../args/lexic-category.args';
import { CreateLexicCategoryInput } from '../inputs/lexic-category.inputs';
import { PaginatedLexicCategory } from '../model/lexic-category.model';
import { LexicCategoryService } from '../service/lexic-category.service';

@Resolver((of) => LexicCategoryResolver)
export class LexicCategoryResolver {
  constructor(private lexicCategoryService: LexicCategoryService) {}

  @Mutation((returns) => String)
  @UseGuards(AuthGuard)
  async createLexicCategory(@Args('createLexicCategory') input: CreateLexicCategoryInput) {
    const result = await this.lexicCategoryService.createLexicCategory(input);
    
     if(result.status !== HttpStatus.OK)
    {
      throw new BadRequestException(result.error)
    }

    return result.id;
  }

  @Query((type) => PaginatedLexicCategory, { name: `findManyLexicCategoriesByCreatorId` })
  @UseGuards(AuthGuard)
  async findManyLexicCategoriesByCreatorId(@Args() args: FindManyLexicCategoriesByCreatorIdArgs) {
    const { creatorId, page, limit } = args;
    const data = {
      creatorId,
      pageFilters: {
        page,
        limit,
      },
    };

    const result = await this.lexicCategoryService.findManyLexicCategoriesByCreatorId(data);
    
    if(result.status !== HttpStatus.OK)
    {
      throw new BadRequestException(result.error)
    }

    return result.data; 
  }

  @Query((type) => PaginatedLexicCategory, { name: `findManyLexicCategories` })
  @UseGuards(AuthGuard)
  async findManyLexicCategories(@Args() args: FindManyLexicCategories) {
    const { page, limit } = args;
    const data = {
      pageFilters: {
        page,
        limit,
      },
    };

    const result = await this.lexicCategoryService.findManyLexicCategories(data);
    
    if(result.status !== HttpStatus.OK)
    {
      throw new BadRequestException(result.error)
    }

    return result.data; 
  }

}
