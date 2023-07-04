import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

import { auth } from '../auth.pb';

export class PageFilters implements auth.PageFilters {
  @IsNumber()
  @Min(0)
  public readonly page: number;

  @IsNumber()
  @Min(1)
  public readonly limit: number;
}

export class FindManyUsersRequestDto implements auth.FindManyUsersRequest {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => PageFilters)
  public readonly pageFilters: PageFilters;
}

export class FindUserByIdRequestDto implements auth.FindUserByIdRequest {
  @IsString()
  public readonly userId: string;
}
