import { IsInt, IsNumber, IsPositive, Min } from 'class-validator';

import { userStats } from '../../user-stats.pb';

export class PageFilters implements userStats.PageFilters {
  @IsNumber({})
  @Min(0)
  page: number;

  @IsNumber()
  @Min(1)
  limit: number;
}
