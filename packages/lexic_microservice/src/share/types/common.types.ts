import { IsInt, IsNumber, IsPositive, Min } from 'class-validator';

import { lexic } from '../../lexic.pb';

export class PageFilters implements lexic.PageFilters {
  @IsNumber({})
  @Min(0)
  page: number;

  @IsNumber()
  @Min(1)
  limit: number;
}
