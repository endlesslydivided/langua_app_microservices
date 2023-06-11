import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsBooleanString,
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

export class CreateWordRequestDto implements lexic.CreateWordRequest {
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  public readonly word: string;

  @IsString()
  @MaxLength(150)
  @MinLength(1)
  public readonly transcription: string;

  @IsString()
  public readonly language: string;

  @IsString()
  public readonly lexicCategoryId: string;
}

export class FindOneWordByIdRequestDto implements lexic.FindOneWordByIdRequest {
  @IsString()
  public readonly id: string;
}

export class FindManyWordsByVocabularyIdRequestDto
  implements lexic.FindManyWordsByVocabularyIdRequest
{
  @IsString()
  public readonly vocabularyId: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => PageFilters)
  public readonly pageFilters: PageFilters;
}

export class FindManyWordsByLexicCategoryIdRequestDto
  implements lexic.FindManyWordsByLexicCategoryIdRequest
{
  @IsString()
  public readonly lexicCategoryId: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => PageFilters)
  public readonly pageFilters: PageFilters;
}

export class CreateWordToVocabularyRequestDto
  implements lexic.CreateWordToVocabularyRequest
{
  @IsString()
  public readonly vocabularyId: string;

  @IsString()
  public readonly wordId: string;
}

export class UpdateWordToVocabularyRequestDto
  implements lexic.UpdateWordToVocabularyRequest
{
  @IsString()
  public readonly id: string;

  @IsBoolean()
  public readonly isFinished: boolean;
}
