import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

import {
  FindManyWordsByLexicCategoryIdArgs,
  FindManyWordsByVocabularyIdArgs,
} from '../args/word.args';
import { CreateWordInput } from '../inputs/word.inputs';
import {
  ModifyWordResponse,
  PaginatedWordResponse,
  Word,
  WordResponse,
} from '../model/word.model';
import { WordService } from '../service/word.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/guard/auth.guard';

@Resolver((of) => Word)
export class WordResolver {
  constructor(private wordService: WordService) {}

  @Mutation((returns) => ModifyWordResponse,{name:'createWord'})
  @UseGuards(AuthGuard)
  async createWord(@Args('createWord') input: CreateWordInput) {
    const result = await this.wordService.createWord(input);
    
    return {
      status: result.status,
      error: result.error,
      data: result.id,
    };
  }

  @Query((returns) => WordResponse,{name:'findOneWordById'})
  @UseGuards(AuthGuard)
  async findOneWordById(@Args('id', { type: () => GraphQLString }) id: string) {
    const result = await this.wordService.findOneWordById({ id });
    return {
      status: result.status,
      error: result.error,
      data: result.word,
    };

  }

  @Query((type) => PaginatedWordResponse, { name: `findManyByVocabularyId` })
  @UseGuards(AuthGuard)
  async findManyByVocabularyId(@Args() args: FindManyWordsByVocabularyIdArgs) {
    const { vocabularyId, page, limit } = args;
    const data = {
      vocabularyId,
      pageFilters: {
        page,
        limit,
      },
    };
    return this.wordService.findManyWordsByVocabularyId(data);
  }

  @Query((type) => PaginatedWordResponse, { name: `findManyWordsByLexicCategoryId` })
  @UseGuards(AuthGuard)
  async findManyWordsByLexicCategoryId(
    @Args() args: FindManyWordsByLexicCategoryIdArgs,
  ) {
    const { lexicCategoryId, page, limit } = args;
    const data = {
      lexicCategoryId,
      pageFilters: {
        page,
        limit,
      },
    };
    return this.wordService.findManyWordsByLexicCategoryId(data);
  }
}
