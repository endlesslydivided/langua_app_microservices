import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { lexic } from '../../lexic.pb';
import { PageFilters } from '../../share/types/common.types';

export class CreateLexicCategoryRequestDto
  implements lexic.CreateLexicCategoryRequest
{
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  public readonly categoryName: string;

  @IsString()
  public readonly creatorUserId: string;
}

export class FindManyLexicCategoriesByCreatorIdRequestDto
  implements lexic.FindManyLexicCategoriesByCreatorIdRequest
{
  @IsString()
  public readonly creatorId: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => PageFilters)
  public readonly pageFilters: PageFilters;
}

export class FindManyLexicCategoriesRequestDto
  implements lexic.FindManyLexicCategoriesRequest
{
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => PageFilters)
  public readonly pageFilters: PageFilters;
}
