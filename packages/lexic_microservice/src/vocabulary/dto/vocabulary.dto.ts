import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

import { lexic } from '../../lexic.pb';
import { PageFilters } from '../../share/types/common.types';

export class CreateVocabularyRequestDto
  implements lexic.CreateVocabularyRequest
{
  @IsString()
  public readonly userId: string;

  @IsString()
  public readonly language: string;

  @IsString()
  public readonly vocabularyNativeLanguage: string;
}

export class FindManyVocabulariesByUserIdRequestDto
  implements lexic.FindManyVocabulariesByUserIdRequest
{
  @IsString()
  public readonly userId: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => PageFilters)
  public readonly pageFilters: PageFilters;
}

export class VocabularyDto
  implements lexic.FindManyVocabulariesByUserIdData.Vocabulary
{
  @IsString()
  id: string;

  @IsString()
  userId: string;

  @IsString()
  language: string;

  @IsString()
  vocabularyNativeLanguage: string;
}
