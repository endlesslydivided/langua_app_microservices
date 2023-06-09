import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { lexic } from '../../lexic.pb';
import {
  CreateLexicCategoryRequestDto,
  FindManyLexicCategoriesByCreatorIdRequestDto,
} from '../dto/lexic-category.dto';
import { LexicCategoryRepository } from '../repository/lexic-category.repository';

@Injectable()
export class LexicCategoryService {
  @Inject(LexicCategoryRepository)
  private readonly lexicCategoryRepository: LexicCategoryRepository;

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
