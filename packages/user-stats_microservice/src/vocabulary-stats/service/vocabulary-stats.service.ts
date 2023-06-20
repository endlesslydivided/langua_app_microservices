import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { userStats } from 'src/user-stats.pb';
import { CreateOrUpdateVocabularyStatsRequestDto, FindManyVocabularyStatsRequestDto, GetOverallVocabularyStatsRequestDto } from '../dto/vocabulary-stats.dto';
import { VocabularyStatsRepository } from '../repository/vocabulary-stats.repository';

@Injectable()
export class VocabularyStatsService {

    @Inject(VocabularyStatsRepository)
    private readonly vocabularyStatsRepository: VocabularyStatsRepository;

    public async createOrUpdate(dto: CreateOrUpdateVocabularyStatsRequestDto): Promise<userStats.CreateOrUpdateVocabularyStatsResponse>{

      let vocabularyStats = await this.vocabularyStatsRepository.findOneByTodayCreatedAt(dto.userId);
      let status = HttpStatus.CREATED;
      if(vocabularyStats)
      {
        status = HttpStatus.NO_CONTENT
        vocabularyStats.startedMaterialsCount += dto.startedMaterialsCount;
        vocabularyStats.learnedMaterialsCount += dto.learnedMaterialsCount;
        vocabularyStats.startedWordsCount += dto.startedWordsCount;
        vocabularyStats.learnedWordsCount += dto.learnedWordsCount;

        await this.vocabularyStatsRepository.save(vocabularyStats);
      }
      else
      {
        vocabularyStats = await this.vocabularyStatsRepository.create(dto);
      }

      return {
        status,
        error: null,
      };    
    }
  
    public async findMany(
      dto: FindManyVocabularyStatsRequestDto,
    ): Promise<userStats.FindManyVocabularyStatsResponse> {
      const data = await this.vocabularyStatsRepository.findManyAndCountByUserId(dto.userId,dto.pageFilters);
      return {
        status: HttpStatus.OK,
        error: null,
        data: {
          rows: data[0],
          count: data[1],
        },
      };
    }

    public async getOverallVocabularyStats(
      dto: GetOverallVocabularyStatsRequestDto,
    ): Promise<userStats.GetOverallVocabularyStatsResponse> {
      const overallVocabularyStats = await this.vocabularyStatsRepository.getOverallVocabularyStats(dto.userId);
      return {
        status: HttpStatus.OK,
        error: null,
        overallVocabularyStats,
      };
    }
}
