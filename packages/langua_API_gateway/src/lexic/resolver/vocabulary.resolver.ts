import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';


import { BadRequestException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { FindManyVocabulariesByUserIdArgs } from '../args/vocabulary.args';
import { CreateVocabularyInput } from '../inputs/vocabulary.inputs';
import { PaginatedVocabulary } from '../model/vocabulary.model';
import { VocabularyService } from '../service/vocabulary.service';

@Resolver((of) => VocabularyResolver)
export class VocabularyResolver {
  constructor(private vocabularyService: VocabularyService) {}

  @Mutation((returns) => String)
  @UseGuards(AuthGuard)
  async createVocabulary(@Args('createVocabulary') input: CreateVocabularyInput) {
    const result = await this.vocabularyService.createVocabulary(input);

    if(result.status !== HttpStatus.OK)
    {
      throw new BadRequestException(result.error)
    }

    return result.id;
  }

  @Query((type) => PaginatedVocabulary, { name: `findManyVocabulariesByUserId` })
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

    const result = await this.vocabularyService.findManyVocabulariesByUserId(data);

    if(result.status !== HttpStatus.OK)
    {
      throw new BadRequestException(result.error)
    }

    return result.data;
  }

}
