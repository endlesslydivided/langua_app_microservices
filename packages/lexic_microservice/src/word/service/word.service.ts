import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { lexic } from '../../lexic.pb';
import {
  CreateWordRequestDto,
  CreateWordToVocabularyRequestDto,
  FindManyWordsByLexicCategoryIdRequestDto,
  FindManyWordsByVocabularyIdRequestDto,
  FindOneWordByIdRequestDto,
  UpdateWordToVocabularyRequestDto,
} from '../dto/word.dto';
import { WordRepository } from '../repository/word.repository';
import { WordToVocabularyRepository } from '../repository/word-to-vocabulary.repository';

@Injectable()
export class WordService {
  @Inject(WordRepository)
  private readonly wordRepository: WordRepository;

  @Inject(WordToVocabularyRepository)
  private readonly wordToVocabularyRepository: WordToVocabularyRepository;

  public async create(
    dto: CreateWordRequestDto,
  ): Promise<lexic.CreateWordResponse> {
    const word = await this.wordRepository.create(dto);
    return {
      status: HttpStatus.OK,
      error: null,
      id: word.id,
    };
  }

  public async findOneById(
    dto: FindOneWordByIdRequestDto,
  ): Promise<lexic.FindOneWordByIdResponse> {
    const word = await this.wordRepository.findOneById(dto.id);
    return {
      status: HttpStatus.OK,
      error: null,
      word,
    };
  }

  public async findManyByVocabularyId(
    dto: FindManyWordsByVocabularyIdRequestDto,
  ): Promise<lexic.FindManyWordsByVocabularyIdResponse> {
    const data = await this.wordRepository.findManyAndCountByVocabularyId(
      dto.vocabularyId,
      dto.pageFilters,
    );
    return {
      status: HttpStatus.OK,
      error: null,
      data: {
        rows: data[0],
        count: data[1],
      },
    };
  }

  public async findManyByLexicCategoryId(
    dto: FindManyWordsByLexicCategoryIdRequestDto,
  ): Promise<lexic.FindManyWordsByLexicCategoryIdResponse> {
    const data = await this.wordRepository.findManyAndCountByLexicCategoryId(
      dto.lexicCategoryId,
      dto.pageFilters,
    );
    return {
      status: HttpStatus.OK,
      error: null,
      data: {
        rows: data[0],
        count: data[1],
      },
    };
  }

  public async createWordToVocabulary(
    dto: CreateWordToVocabularyRequestDto,
  ): Promise<lexic.CreateWordToVocabularyResponse> {
    const wordToVocabulary =
      await this.wordToVocabularyRepository.createWordToVocabulary(dto);
    return {
      status: HttpStatus.OK,
      error: null,
      id: wordToVocabulary.id,
    };
  }

  public async updateWordToVocabulary(
    dto: UpdateWordToVocabularyRequestDto,
  ): Promise<lexic.UpdateWordToVocabularyResponse> {
    const wordToVocabulary = await this.wordToVocabularyRepository.findOneById(
      dto.id,
    );

    if (!wordToVocabulary) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['Vocabulary word is not found'],
      };
    }

    await this.wordToVocabularyRepository.updateWordToVocabulary(
      wordToVocabulary,
      dto.isFinished,
    );

    return {
      status: HttpStatus.NO_CONTENT,
      error: null,
    };
  }
}
