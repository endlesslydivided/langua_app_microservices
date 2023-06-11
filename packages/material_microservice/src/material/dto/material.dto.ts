import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { material } from 'src/material.pb';

import { PageFilters } from '../../share/types/common.types';

export class CreateMaterialRequestDto
  implements material.CreateMaterialRequest
{
  @IsString()
  public readonly creatorUserId: string;

  @IsString()
  public readonly name: string;

  @IsString()
  public readonly language: string;

  @IsString()
  public readonly textContent: string;
}

export class FindOneMaterialRequestByIdDto
  implements material.FindOneMaterialByIdRequest
{
  @IsString()
  public readonly id: string;
}

export class FindManyMaterialsByVocabularyIdRequestDto
  implements material.FindManyMaterialsByVocabularyIdRequest
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

export class FindManyMaterialsByCreatorIdRequestDto
  implements material.FindManyMaterialsByCreatorIdRequest
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

export class CreateMaterialToVocabularyRequestDto
  implements material.CreateMaterialToVocabularyRequest
{
  @IsString()
  vocabularyId: string;

  @IsString()
  materialId: string;
}
export class UpdateMaterialToVocabularyRequestDto
  implements material.UpdateMaterialToVocabularyRequest
{
  @IsString()
  id: string;

  @IsBoolean()
  isFinished: boolean;
}
export class DeleteMaterialToVocabularyRequestDto
  implements material.DeleteMaterialToVocabularyRequest
{
  @IsString()
  id: string;
}
