import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';


import { PaginatedVocabularyResponse } from '../model/vocabulary.model';
import {
  ModifyWordToVocabularyResponse
} from '../model/word-to-vocabulary.model';
import { VocabularyService } from '../service/vocabulary.service';
import { CreateVocabularyInput } from '../inputs/vocabulary.inputs';
import { FindManyVocabulariesByUserIdArgs } from '../args/vocabulary.args';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/guard/auth.guard';

@Resolver((of) => VocabularyResolver)
export class VocabularyResolver {
  constructor(private vocabularyService: VocabularyService) {}

  @Mutation((returns) => ModifyWordToVocabularyResponse)
  @UseGuards(AuthGuard)
  async createVocabulary(@Args('createVocabulary') input: CreateVocabularyInput) {
    const result = await this.vocabularyService.createVocabulary(input);
    return {
      status: result.status,
      error: result.error,
      data: result.id,
    };
  }

  @Query((type) => PaginatedVocabularyResponse, { name: `findManyVocabulariesByUserId` })
  @UseGuards(AuthGuard)
  async findManyVocabulariesByUserId(@Args() args: FindManyVocabulariesByUserIdArgs) {
    const { userId, page, limit } = args;
    const data = {
      userId,
      pageFilters: {
        page,
        limit,
      },
    };
    return this.vocabularyService.findManyVocabulariesByUserId(data);
  }

}
