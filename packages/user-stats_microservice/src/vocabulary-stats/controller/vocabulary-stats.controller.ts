import { Controller, Inject } from '@nestjs/common';
import { VocabularyStatsService } from '../service/vocabulary-stats.service';
import { USER_STATS_SERVICE_NAME, userStats } from '../../user-stats.pb';
import {
  CreateOrUpdateVocabularyStatsRequestDto,
  FindManyVocabularyStatsRequestDto,
  GetOverallVocabularyStatsRequestDto,
} from '../dto/vocabulary-stats.dto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class VocabularyStatsController {

  constructor(private  service: VocabularyStatsService)
  {

  }

  @GrpcMethod(USER_STATS_SERVICE_NAME, 'CreateOrUpdateVocabularyStats')
  private createOrUpdateVocabularyStats(
    payload: CreateOrUpdateVocabularyStatsRequestDto,
  ): Promise<userStats.CreateOrUpdateVocabularyStatsResponse> {
    return this.service.createOrUpdate(payload);
  }

  @GrpcMethod(USER_STATS_SERVICE_NAME, 'GetOverallVocabularyStats')
  private getOverallVocabularyStats(
    payload: GetOverallVocabularyStatsRequestDto,
  ): Promise<userStats.GetOverallVocabularyStatsResponse> {
    return this.service.getOverallVocabularyStats(payload);
  }

  @GrpcMethod(USER_STATS_SERVICE_NAME, 'findManyVocabularyStats')
  private findManyVocabularyStats(
    payload: FindManyVocabularyStatsRequestDto,
  ): Promise<userStats.FindManyVocabularyStatsResponse> {
    return this.service.findMany(payload);
  }
}
