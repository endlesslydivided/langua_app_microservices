import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PageFilters } from '../../share/types/common.types';
import { userStats } from '../../user-stats.pb';

export class CreateOrUpdateVocabularyStatsRequestDto
  implements userStats.CreateOrUpdateVocabularyStatsRequest
{
  @IsOptional()
  @IsString()
  id: string;

  @IsString()
  userId: string;

  @IsNumber()
  startedMaterialsCount: number;

  @IsNumber()
  learnedMaterialsCount: number;

  @IsNumber()
  startedWordsCount: number;

  @IsNumber()
  learnedWordsCount: number;
}

export class GetOverallVocabularyStatsRequestDto
  implements userStats.GetOverallVocabularyStatsRequest
{
  @IsString()
  userId: string;
}

export class FindManyVocabularyStatsRequestDto
  implements userStats.FindManyVocabularyStatsRequest
{
  @IsString()
  userId: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => PageFilters)
  pageFilters: PageFilters;
}
