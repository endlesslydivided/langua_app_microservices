import { IsNumber, IsPositive, Min } from 'class-validator';

import { material } from '../../material.pb';

export class PageFilters implements material.PageFilters {
  @IsNumber()
  @Min(0)
  public readonly page: number;

  @IsNumber()
  @Min(1)
  public readonly limit: number;
}
