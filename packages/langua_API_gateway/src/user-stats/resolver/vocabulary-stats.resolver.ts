import { BadRequestException, HttpStatus, UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { GraphQLString } from "graphql";
import { AuthGuard } from "../../auth/guard/auth.guard";
import { FindManyVocabularyStatsByUserIdArgs } from "../args/vocabulary-stats.args";
import { OverallVocabularyStats, PaginatedVocabularyStats, VocabularyStats } from "../model/vocabulary-stats.model";
import { VocabularyStatsService } from "../service/vocabulary-stats.service";


@Resolver((of) => VocabularyStats)
export class VocabularyStatsResolver {
  constructor(private vocabularyStatsService: VocabularyStatsService) {}

  @Query((returns) => OverallVocabularyStats,{name:'getOverallVocabularyStats'})
  @UseGuards(AuthGuard)
  async getOverallVocabularyStats(@Args('userId', { type: () => GraphQLString }) userId: string) {
    const result = await this.vocabularyStatsService.getOverallVocabularyStats({ userId });

    if(result.status !== HttpStatus.OK)
    {
      throw new BadRequestException(result.error)
    }

    return  result.overallVocabularyStats;
  }

  @Query((type) => PaginatedVocabularyStats, { name: `findManyVocabularyStats` })
  @UseGuards(AuthGuard)
  async findManyVocabularyStats(@Args() args: FindManyVocabularyStatsByUserIdArgs) {
    const { userId, page, limit } = args;
    const data = {
      userId,
      pageFilters: {
        page,
        limit,
      },
    };

    const result = await this.vocabularyStatsService.findManyVocabularyStats(data);
    
    if(result.status !== HttpStatus.OK)
    {
      throw new BadRequestException(result.error)
    }

    return {
      count: result?.data?.count,
      rows: result?.data?.rows,

    }
  }
}
