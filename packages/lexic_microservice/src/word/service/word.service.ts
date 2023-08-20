import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { userStats } from 'src/user-stats.pb';
import { lexic } from '../../lexic.pb';
import {
  CreateWordRequestDto,
  CreateWordToVocabularyRequestDto,
  FindManyWordsByLexicCategoryIdRequestDto,
  FindManyWordsByVocabularyIdRequestDto,
  FindOneWordByIdRequestDto,
  UpdateWordToVocabularyRequestDto,
} from '../dto/word.dto';
import { WordToVocabularyRepository } from '../repository/word-to-vocabulary.repository';
import { WordRepository } from '../repository/word.repository';

@Injectable()
export class WordService {

  constructor( private wordRepository: WordRepository,
               private wordToVocabularyRepository: WordToVocabularyRepository,
               @Inject('USER_STATS_PACKAGE') private userStatsClient: ClientGrpc){
    
  }


  private userStatsService: userStats.UserStatsService;


  onModuleInit() {
    this.userStatsService = this.userStatsClient.getService<userStats.UserStatsService>('UserStatsService');
  }

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

    const updateVocabularyStatsBody ={
      userId: dto.userId,
      startedMaterialsCount: 0,
      learnedMaterialsCount: 0,
      startedWordsCount: !wordToVocabulary.isFinished && dto.isFinished ? -1 : 1,
      learnedWordsCount: !wordToVocabulary.isFinished && dto.isFinished ? 1 : -1,
    }

    const observableResultUserStats = await firstValueFrom(await this.userStatsService.createOrUpdateVocabularyStats(updateVocabularyStatsBody));
  
    return{
      status: HttpStatus.NO_CONTENT,
      error: null,
    };
   
  }
}
