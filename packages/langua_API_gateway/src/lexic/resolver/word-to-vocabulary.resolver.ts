import { Args, Mutation, Resolver } from '@nestjs/graphql';

import {
  CreateWordToVocabularyInput,
  UpdateWordToVocabularyInput,
} from '../inputs/word-to-vocabulary.inputs';
import {
  ModifyWordToVocabularyResponse,
  WordToVocabulary,
} from '../model/word-to-vocabulary.model';
import { WordService } from '../service/word.service';

@Resolver((of) => WordToVocabulary)
export class WordToVocabularyResolver {
  constructor(private wordService: WordService) {}

  @Mutation((returns) => ModifyWordToVocabularyResponse)
  async createWordToVocabulary(@Args('createWordToVocabulary') input: CreateWordToVocabularyInput) {
    const result = await this.wordService.createWordToVocabulary(input);
    return {
      status: result.status,
      error: result.error,
      data: result.id,
    };
  }

  @Mutation((returns) => ModifyWordToVocabularyResponse)
  async updateWordToVocabulary(@Args('updateWordToVocabulary') input: UpdateWordToVocabularyInput) {
    return this.wordService.updateWordToVocabulary(input);
  }
}
