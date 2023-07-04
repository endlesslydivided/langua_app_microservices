import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { userStats, USER_STATS_SERVICE_NAME } from '../../langua_proto/user-stats.pb';

@Injectable()
export class VocabularyStatsService {
  private userStatsServiceClient: userStats.UserStatsService;

  @Inject(USER_STATS_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.userStatsServiceClient =
      this.client.getService<userStats.UserStatsService>(USER_STATS_SERVICE_NAME);
  }
 
  public async getOverallVocabularyStats(
    data: userStats.GetOverallVocabularyStatsRequest,
  ): Promise<userStats.GetOverallVocabularyStatsResponse> {
    return firstValueFrom(
      this.userStatsServiceClient.getOverallVocabularyStats(data),
    );
  }

  public async findManyVocabularyStats(
    data: userStats.FindManyVocabularyStatsRequest,
  ): Promise<userStats.FindManyVocabularyStatsResponse> {
    return firstValueFrom(
      this.userStatsServiceClient.findManyVocabularyStats(data),
    );
  }


}
