import { Resolver, Args,Query } from "@nestjs/graphql";
import { GraphQLString } from "graphql";
import { OverallVocabularyStatsResponse, VocabularyStats, VocabularyStatsResponse } from "../model/vocabulary-stats.model";
import { VocabularyStatsService } from "../service/vocabulary-stats.service";
import { FindManyVocabularyStatsByUserIdArgs } from "../args/vocabulary-stats.args";


@Resolver((of) => VocabularyStats)
export class VocabularyStatsResolver {
  constructor(private vocabularyStatsService: VocabularyStatsService) {}

  @Query((returns) => OverallVocabularyStatsResponse,{name:'getOverallVocabularyStats'})
  async getOverallVocabularyStats(@Args('userId', { type: () => GraphQLString }) userId: string) {
    const result = await this.vocabularyStatsService.getOverallVocabularyStats({ userId });
    return {
      status: result.status,
      error: result.error,
      data: result.overallVocabularyStats,
    };
  }

  @Query((type) => VocabularyStatsResponse, { name: `findManyVocabularyStats` })
  async findManyVocabularyStats(@Args() args: FindManyVocabularyStatsByUserIdArgs) {
    const { userId, page, limit } = args;
    const data = {
      userId,
      pageFilters: {
        page,
        limit,
      },
    };
    return this.vocabularyStatsService.findManyVocabularyStats(data);
  }
}
