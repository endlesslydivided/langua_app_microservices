import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

import { BadRequestException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/guard/auth.guard';
import {
  FindManyWordsByLexicCategoryIdArgs,
  FindManyWordsByVocabularyIdArgs,
} from '../args/word.args';
import { CreateWordInput } from '../inputs/word.inputs';
import {
  PaginatedWord,
  Word
} from '../model/word.model';
import { WordService } from '../service/word.service';

@Resolver((of) => Word)
export class WordResolver {
  constructor(private wordService: WordService) {}

  @Mutation((returns) => String,{name:'createWord'})
  @UseGuards(AuthGuard)
  async createWord(@Args('createWord') input: CreateWordInput) {
    const result = await this.wordService.createWord(input);
    
    if(result.status !== HttpStatus.OK)
    {
      throw new BadRequestException(result.error)
    }

    return result.id;
  }

  @Query((returns) => Word,{name:'findOneWordById'})
  @UseGuards(AuthGuard)
  async findOneWordById(@Args('id', { type: () => GraphQLString }) id: string) {
    const result = await this.wordService.findOneWordById({ id });

    if(result.status !== HttpStatus.OK)
    {
      throw new BadRequestException(result.error)
    }

    return result.word;

  }

  @Query((type) => PaginatedWord, { name: `findManyWordsByVocabularyId` })
  @UseGuards(AuthGuard)
  async findManyWordsByVocabularyId(@Args() args: FindManyWordsByVocabularyIdArgs) {
    const { vocabularyId, page, limit } = args;
    const data = {
      vocabularyId,
      pageFilters: {
        page,
        limit,
      },
    };

    const result = await this.wordService.findManyWordsByVocabularyId(data);

    if(result.status !== HttpStatus.OK)
    {
      throw new BadRequestException(result.error)
    }

    return { 
      rows: result?.data?.rows,
      count: result?.data?.count
    };
  }

  @Query((type) => PaginatedWord, { name: `findManyWordsByLexicCategoryId` })
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

    const result = await this.wordService.findManyWordsByLexicCategoryId(data);

    if(result.status !== HttpStatus.OK)
    {
      throw new BadRequestException(result.error)
    }

    return { 
      rows: result?.data?.rows,
      count: result?.data?.count
    };
   
  }
}
