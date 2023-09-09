import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { BadRequestException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/guard/auth.guard';
import {
  CreateWordToVocabularyInput,
  UpdateWordToVocabularyInput,
} from '../inputs/word-to-vocabulary.inputs';
import {
  WordToVocabulary
} from '../model/word-to-vocabulary.model';
import { WordService } from '../service/word.service';
import { Void } from '../../share/scalar/void.scalar';

@Resolver((of) => WordToVocabulary)
export class WordToVocabularyResolver {
  constructor(private wordService: WordService) {}

  @Mutation((returns) => String)
  @UseGuards(AuthGuard)
  async createWordToVocabulary(@Args('createWordToVocabulary') input: CreateWordToVocabularyInput) {
    const result = await this.wordService.createWordToVocabulary(input);

    if(result.status !== HttpStatus.OK)
    {
      throw new BadRequestException(result.error)
    }

    return result.id;
  }

  @Mutation((returns) => Void)
  @UseGuards(AuthGuard)
  async updateWordToVocabulary(@Args('updateWordToVocabulary') input: UpdateWordToVocabularyInput) {

    const result = await this.wordService.updateWordToVocabulary(input);

    if(result.status !== HttpStatus.NO_CONTENT)
    {
      throw new BadRequestException(result.error)
    }

    return;
  }
}
