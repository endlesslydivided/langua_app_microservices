import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { lexic } from '../../lexic.pb';
import {
  CreateLexicCategoryRequestDto,
  FindManyLexicCategoriesByCreatorIdRequestDto,
  FindManyLexicCategoriesRequestDto,
} from '../dto/lexic-category.dto';
import { LexicCategoryRepository } from '../repository/lexic-category.repository';

@Injectable()
export class LexicCategoryService {

  constructor(private lexicCategoryRepository: LexicCategoryRepository){
    
  }


  public async create(
    dto: CreateLexicCategoryRequestDto,
  ): Promise<lexic.CreateLexicCategoryResponse> {
    const lexicCategory = await this.lexicCategoryRepository.create(dto);
    return {
      status: HttpStatus.OK,
      error: null,
      id: lexicCategory.id,
    };
  }

  public async findManyAndCountByCreatorId(
    dto: FindManyLexicCategoriesByCreatorIdRequestDto,
  ): Promise<lexic.FindManyVocabulariesByUserIdResponse> {
    const data = await this.lexicCategoryRepository.findManyAndCountByCreatorId(
      dto.creatorId,
      dto.language,
      dto.nativeCategoryLanguage,
      dto.pageFilters,
    );
    return {
      status: HttpStatus.OK,
      error: null,
      data: {
        rows: data[0],
        count: data[1],
      },
    };
  }

  public async findManyAndCount(
    dto: FindManyLexicCategoriesRequestDto,
  ): Promise<lexic.FindManyVocabulariesByUserIdResponse> {
    const data = await this.lexicCategoryRepository.findManyAndCount(
      dto.language,
      dto.nativeCategoryLanguage,
      dto.pageFilters,
    );
    return {
      status: HttpStatus.OK,
      error: null,
      data: {
        rows: data[0],
        count: data[1],
      },
    };
  }
}
